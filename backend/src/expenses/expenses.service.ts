import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

@Injectable()
export class ExpensesService {
  constructor(private prisma: PrismaService) {}

  findAll(filters?: { month?: number; year?: number; category?: string }) {
    const where: any = {};

    if (filters?.month && filters?.year) {
      const start = new Date(filters.year, filters.month - 1, 1);
      const end = new Date(filters.year, filters.month, 0, 23, 59, 59);
      where.date = { gte: start, lte: end };
    }

    if (filters?.category) {
      where.category = filters.category;
    }

    return this.prisma.expense.findMany({
      where,
      orderBy: { date: 'desc' },
    });
  }

  async findOne(id: string) {
    const expense = await this.prisma.expense.findUnique({ where: { id } });
    if (!expense) throw new NotFoundException(`Gasto #${id} não encontrado`);
    return expense;
  }

  create(dto: CreateExpenseDto) {
    return this.prisma.expense.create({
      data: { ...dto, date: new Date(dto.date) },
    });
  }

  async update(id: string, dto: UpdateExpenseDto) {
    await this.findOne(id);
    const data: any = { ...dto };
    if (dto.date) data.date = new Date(dto.date);
    return this.prisma.expense.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.expense.delete({ where: { id } });
  }
}
