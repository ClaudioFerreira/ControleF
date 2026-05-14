import { Controller, Get, Post, Patch, Param, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { MonthlyControlService } from './monthly-control.service';
import { GenerateSnapshotDto, UpdateSnapshotDto, UpdateEntryStatusDto } from './dto/monthly-control.dto';
import { PaymentStatus } from '@prisma/client';

@ApiTags('monthly-control')
@Controller('monthly-control')
export class MonthlyControlController {
  constructor(private readonly monthlyControlService: MonthlyControlService) {}

  // Endpoint n8n-ready: GET /monthly-control/dashboard
  @Get('dashboard')
  @ApiOperation({ summary: 'Resumo do dashboard — compatível com n8n/automações' })
  getDashboardSummary() {
    return this.monthlyControlService.getDashboardSummary();
  }

  @Get('snapshot')
  @ApiOperation({ summary: 'Buscar snapshot de um mês/ano' })
  @ApiQuery({ name: 'month', type: Number })
  @ApiQuery({ name: 'year', type: Number })
  getSnapshot(@Query('month') month: number, @Query('year') year: number) {
    return this.monthlyControlService.getSnapshot(+month, +year);
  }

  @Post('generate')
  @ApiOperation({ summary: 'Gerar/atualizar snapshot de um mês' })
  generateSnapshot(@Body() dto: GenerateSnapshotDto) {
    return this.monthlyControlService.generateSnapshot(dto);
  }

  @Patch(':snapshotId')
  @ApiOperation({ summary: 'Atualizar dados do snapshot (ex: renda do mês)' })
  updateSnapshot(@Param('snapshotId') id: string, @Body() dto: UpdateSnapshotDto) {
    return this.monthlyControlService.updateSnapshot(id, dto);
  }

  @Patch(':snapshotId/entries/:entryId')
  @ApiOperation({ summary: 'Marcar entrada como paga/pendente' })
  updateEntryStatus(
    @Param('snapshotId') snapshotId: string,
    @Param('entryId') entryId: string,
    @Body() dto: UpdateEntryStatusDto,
  ) {
    return this.monthlyControlService.updateEntryStatus(snapshotId, entryId, dto.status as PaymentStatus);
  }
}
