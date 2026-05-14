import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInstallmentPlanDto } from './dto/create-installment-plan.dto';
import { UpdateInstallmentPlanDto } from './dto/update-installment-plan.dto';
import { PaymentStatus } from '@prisma/client';

@Injectable()
export class InstallmentsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.installmentPlan.findMany({
      orderBy: { createdAt: 'desc' },
      include: { _count: { select: { installments: true } } },
    });
  }

  async findOne(id: string) {
    const plan = await this.prisma.installmentPlan.findUnique({
      where: { id },
      include: { installments: { orderBy: { installmentNumber: 'asc' } } },
    });
    if (!plan) throw new NotFoundException(`Plano de parcelas #${id} não encontrado`);
    return plan;
  }

  async create(dto: CreateInstallmentPlanDto) {
    const startDate = new Date(dto.startDate);

    // Gera todas as parcelas automaticamente
    const installmentsData = Array.from({ length: dto.totalInstallments }, (_, i) => {
      const dueDate = new Date(startDate);
      dueDate.setMonth(dueDate.getMonth() + i);
      return {
        installmentNumber: i + 1,
        value: dto.installmentValue,
        dueDate,
        status: PaymentStatus.PENDING,
      };
    });

    return this.prisma.installmentPlan.create({
      data: {
        ...dto,
        startDate,
        installments: { create: installmentsData },
      },
      include: { installments: true },
    });
  }

  async update(id: string, dto: UpdateInstallmentPlanDto) {
    await this.findOne(id);
    const data: any = { ...dto };
    if (dto.startDate) data.startDate = new Date(dto.startDate);
    return this.prisma.installmentPlan.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.installmentPlan.delete({ where: { id } });
  }

  getInstallments(planId: string) {
    return this.prisma.installment.findMany({
      where: { planId },
      orderBy: { installmentNumber: 'asc' },
    });
  }

  async updateInstallmentStatus(planId: string, installmentId: string, status: PaymentStatus) {
    const installment = await this.prisma.installment.findFirst({
      where: { id: installmentId, planId },
    });
    if (!installment) throw new NotFoundException('Parcela não encontrada');

    const updated = await this.prisma.installment.update({
      where: { id: installmentId },
      data: {
        status,
        paidAt: status === PaymentStatus.PAID ? new Date() : null,
      },
    });

    // Recalcula total de parcelas pagas no plano
    const paidCount = await this.prisma.installment.count({
      where: { planId, status: PaymentStatus.PAID },
    });
    await this.prisma.installmentPlan.update({
      where: { id: planId },
      data: { paidInstallments: paidCount },
    });

    return updated;
  }
}
