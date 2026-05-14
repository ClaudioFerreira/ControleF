import { Controller, Get, Post, Patch, Delete, Param, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

@ApiTags('expenses')
@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Get()
  @ApiOperation({ summary: 'Listar gastos (filtro opcional por mês/ano/categoria)' })
  @ApiQuery({ name: 'month', required: false, type: Number })
  @ApiQuery({ name: 'year', required: false, type: Number })
  @ApiQuery({ name: 'category', required: false, type: String })
  findAll(
    @Query('month') month?: string,
    @Query('year') year?: string,
    @Query('category') category?: string,
  ) {
    return this.expensesService.findAll({
      month: month ? +month : undefined,
      year: year ? +year : undefined,
      category,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar gasto por ID' })
  findOne(@Param('id') id: string) {
    return this.expensesService.findOne(id);
  }

  // Endpoint n8n-ready: POST /expenses pode ser chamado via webhook do n8n
  @Post()
  @ApiOperation({ summary: 'Criar gasto esporádico (compatível com n8n/Telegram)' })
  create(@Body() dto: CreateExpenseDto) {
    return this.expensesService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar gasto' })
  update(@Param('id') id: string, @Body() dto: UpdateExpenseDto) {
    return this.expensesService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover gasto' })
  remove(@Param('id') id: string) {
    return this.expensesService.remove(id);
  }
}
