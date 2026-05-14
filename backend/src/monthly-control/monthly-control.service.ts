import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaymentStatus, MonthlyEntryType } from '@prisma/client';
import { GenerateSnapshotDto, UpdateSnapshotDto } from './dto/monthly-control.dto';

@Injectable()
export class MonthlyControlService {
  constructor(private prisma: PrismaService) {}

  async getSnapshot(month: number, year: number) {
    return this.prisma.monthlySnapshot.findUnique({
      where: { month_year: { month, year } },
      include: { entries: { orderBy: { dueDate: 'asc' } } },
    });
  }

  /**
   * Gera (ou regenera) o snapshot mensal:
   * - Coleta todas as contas recorrentes ativas
   * - Coleta todas as parcelas com vencimento no mês
   * - Calcula totais
   */
  async generateSnapshot(dto: GenerateSnapshotDto) {
    const { month, year } = dto;
    const startOfMonth = new Date(year, month - 1, 1);
    const endOfMonth = new Date(year, month, 0, 23, 59, 59);

    // Busca contas recorrentes ativas
    const recurringAccounts = await this.prisma.recurringAccount.findMany({
      where: { isActive: true },
    });

    // Busca parcelas com vencimento no mês
    const installments = await this.prisma.installment.findMany({
      where: { dueDate: { gte: startOfMonth, lte: endOfMonth } },
      include: { plan: true },
    });

    // Monta entradas
    const entriesData = [
      ...recurringAccounts.map((acc) => ({
        referenceType: MonthlyEntryType.RECURRING,
        recurringAccountId: acc.id,
        name: acc.name,
        value: Number(acc.averageValue),
        dueDate: new Date(year, month - 1, acc.dueDay),
        status: PaymentStatus.PENDING,
      })),
      ...installments.map((inst) => ({
        referenceType: MonthlyEntryType.INSTALLMENT,
        installmentId: inst.id,
        name: `${inst.plan.name} (${inst.installmentNumber}/${inst.plan.totalInstallments})`,
        value: Number(inst.value),
        dueDate: inst.dueDate,
        status: inst.status,
        paidAt: inst.paidAt,
      })),
    ];

    const totalBills = entriesData.reduce((s, e) => s + e.value, 0);

    // Upsert: cria ou recria o snapshot
    return this.prisma.monthlySnapshot.upsert({
      where: { month_year: { month, year } },
      create: {
        month,
        year,
        totalBills,
        totalPaid: 0,
        totalPending: totalBills,
        entries: { create: entriesData },
      },
      update: {
        totalBills,
        totalPaid: 0,
        totalPending: totalBills,
        entries: {
          deleteMany: {},
          create: entriesData,
        },
      },
      include: { entries: { orderBy: { dueDate: 'asc' } } },
    });
  }

  async updateEntryStatus(snapshotId: string, entryId: string, status: PaymentStatus) {
    const entry = await this.prisma.monthlyEntry.findFirst({
      where: { id: entryId, snapshotId },
    });
    if (!entry) throw new NotFoundException('Entrada não encontrada no snapshot');

    const updated = await this.prisma.monthlyEntry.update({
      where: { id: entryId },
      data: { status, paidAt: status === PaymentStatus.PAID ? new Date() : null },
    });

    // Recalcula totais do snapshot
    await this.recalculateSnapshot(snapshotId);

    return updated;
  }

  async updateSnapshot(snapshotId: string, dto: UpdateSnapshotDto) {
    const snapshot = await this.prisma.monthlySnapshot.findUnique({ where: { id: snapshotId } });
    if (!snapshot) throw new NotFoundException('Snapshot não encontrado');
    return this.prisma.monthlySnapshot.update({ where: { id: snapshotId }, data: dto });
  }

  /** Recalcula totalPaid e totalPending com base nas entradas */
  private async recalculateSnapshot(snapshotId: string) {
    const entries = await this.prisma.monthlyEntry.findMany({ where: { snapshotId } });
    const totalPaid = entries
      .filter((e) => e.status === PaymentStatus.PAID)
      .reduce((s, e) => s + Number(e.value), 0);
    const totalPending = entries
      .filter((e) => e.status !== PaymentStatus.PAID)
      .reduce((s, e) => s + Number(e.value), 0);

    await this.prisma.monthlySnapshot.update({
      where: { id: snapshotId },
      data: { totalPaid, totalPending },
    });
  }

  /** Dashboard: resumo do mês atual + evolução + investimentos */
  async getDashboardSummary() {
    const now = new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();

    const [snapshot, investments, lastMonths] = await Promise.all([
      this.getSnapshot(month, year),
      this.prisma.investment.findMany(),
      this.prisma.monthlySnapshot.findMany({
        orderBy: [{ year: 'desc' }, { month: 'desc' }],
        take: 6,
      }),
    ]);

    const totalInvested = investments.reduce((s, i) => s + Number(i.investedValue), 0);
    const totalCurrent = investments.reduce((s, i) => s + Number(i.currentValue), 0);

    // Gastos do mês por categoria
    const expenses = await this.prisma.expense.groupBy({
      by: ['category'],
      where: {
        date: {
          gte: new Date(year, month - 1, 1),
          lte: new Date(year, month, 0, 23, 59, 59),
        },
      },
      _sum: { value: true },
    });

    return {
      currentMonth: {
        totalBills: Number(snapshot?.totalBills ?? 0),
        totalPaid: Number(snapshot?.totalPaid ?? 0),
        totalPending: Number(snapshot?.totalPending ?? 0),
        totalExpenses: expenses.reduce((s, e) => s + Number(e._sum.value ?? 0), 0),
        income: snapshot?.income ? Number(snapshot.income) : undefined,
      },
      investments: {
        totalInvested,
        totalCurrent,
        gain: totalCurrent - totalInvested,
      },
      monthlyEvolution: lastMonths.reverse().map((s) => ({
        month: `${String(s.month).padStart(2, '0')}/${s.year}`,
        total: Number(s.totalBills),
        paid: Number(s.totalPaid),
      })),
      expensesByCategory: expenses.map((e) => ({
        category: e.category,
        total: Number(e._sum.value ?? 0),
      })),
    };
  }
}
