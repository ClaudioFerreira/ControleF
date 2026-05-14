import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { InvestmentsService } from './investments.service';
import { CreateInvestmentDto } from './dto/create-investment.dto';
import { UpdateInvestmentDto } from './dto/update-investment.dto';

@ApiTags('investments')
@Controller('investments')
export class InvestmentsController {
  constructor(private readonly investmentsService: InvestmentsService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos os investimentos' })
  findAll() {
    return this.investmentsService.findAll();
  }

  @Get('summary')
  @ApiOperation({ summary: 'Resumo consolidado dos investimentos' })
  getSummary() {
    return this.investmentsService.getSummary();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar investimento por ID' })
  findOne(@Param('id') id: string) {
    return this.investmentsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Cadastrar investimento' })
  create(@Body() dto: CreateInvestmentDto) {
    return this.investmentsService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar investimento (ex: valor atual)' })
  update(@Param('id') id: string, @Body() dto: UpdateInvestmentDto) {
    return this.investmentsService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover investimento' })
  remove(@Param('id') id: string) {
    return this.investmentsService.remove(id);
  }
}
