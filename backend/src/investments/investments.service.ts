import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInvestmentDto } from './dto/create-investment.dto';
import { UpdateInvestmentDto } from './dto/update-investment.dto';

@Injectable()
export class InvestmentsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.investment.findMany({ orderBy: { date: 'desc' } });
  }

  async findOne(id: string) {
    const inv = await this.prisma.investment.findUnique({ where: { id } });
    if (!inv) throw new NotFoundException(`Investimento #${id} não encontrado`);
    return inv;
  }

  create(dto: CreateInvestmentDto) {
    return this.prisma.investment.create({
      data: { ...dto, date: new Date(dto.date) },
    });
  }

  async update(id: string, dto: UpdateInvestmentDto) {
    await this.findOne(id);
    const data: any = { ...dto };
    if (dto.date) data.date = new Date(dto.date);
    return this.prisma.investment.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.investment.delete({ where: { id } });
  }

  async getSummary() {
    const investments = await this.findAll();
    const totalInvested = investments.reduce((s, i) => s + Number(i.investedValue), 0);
    const totalCurrent = investments.reduce((s, i) => s + Number(i.currentValue), 0);
    return {
      totalInvested,
      totalCurrent,
      gain: totalCurrent - totalInvested,
      gainPercent: totalInvested > 0 ? ((totalCurrent - totalInvested) / totalInvested) * 100 : 0,
      count: investments.length,
    };
  }
}
