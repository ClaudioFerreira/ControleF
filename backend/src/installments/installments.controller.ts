import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { InstallmentsService } from './installments.service';
import { CreateInstallmentPlanDto } from './dto/create-installment-plan.dto';
import { UpdateInstallmentPlanDto } from './dto/update-installment-plan.dto';
import { UpdateInstallmentStatusDto } from './dto/update-installment-status.dto';

@ApiTags('installments')
@Controller('installments')
export class InstallmentsController {
  constructor(private readonly installmentsService: InstallmentsService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos os planos de parcelamento' })
  findAll() {
    return this.installmentsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar plano com suas parcelas' })
  findOne(@Param('id') id: string) {
    return this.installmentsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Criar plano de parcelamento (gera parcelas automaticamente)' })
  create(@Body() dto: CreateInstallmentPlanDto) {
    return this.installmentsService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar plano de parcelamento' })
  update(@Param('id') id: string, @Body() dto: UpdateInstallmentPlanDto) {
    return this.installmentsService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover plano e todas as parcelas' })
  remove(@Param('id') id: string) {
    return this.installmentsService.remove(id);
  }

  @Get(':id/installments')
  @ApiOperation({ summary: 'Listar parcelas de um plano' })
  getInstallments(@Param('id') planId: string) {
    return this.installmentsService.getInstallments(planId);
  }

  @Patch(':id/installments/:installmentId')
  @ApiOperation({ summary: 'Marcar parcela como paga/pendente' })
  updateInstallmentStatus(
    @Param('id') planId: string,
    @Param('installmentId') installmentId: string,
    @Body() dto: UpdateInstallmentStatusDto,
  ) {
    return this.installmentsService.updateInstallmentStatus(planId, installmentId, dto.status);
  }
}
