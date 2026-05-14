import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRecurringAccountDto } from './dto/create-recurring-account.dto';
import { UpdateRecurringAccountDto } from './dto/update-recurring-account.dto';

@Injectable()
export class AccountsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.recurringAccount.findMany({
      orderBy: { dueDay: 'asc' },
    });
  }

  async findOne(id: string) {
    const account = await this.prisma.recurringAccount.findUnique({ where: { id } });
    if (!account) throw new NotFoundException(`Conta recorrente #${id} não encontrada`);
    return account;
  }

  create(dto: CreateRecurringAccountDto) {
    return this.prisma.recurringAccount.create({
      data: { ...dto, averageValue: dto.averageValue },
    });
  }

  async update(id: string, dto: UpdateRecurringAccountDto) {
    await this.findOne(id); // valida existência
    return this.prisma.recurringAccount.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.recurringAccount.delete({ where: { id } });
  }
}
