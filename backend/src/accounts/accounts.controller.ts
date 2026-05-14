import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AccountsService } from './accounts.service';
import { CreateRecurringAccountDto } from './dto/create-recurring-account.dto';
import { UpdateRecurringAccountDto } from './dto/update-recurring-account.dto';

@ApiTags('accounts')
@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas as contas recorrentes' })
  findAll() {
    return this.accountsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar conta recorrente por ID' })
  findOne(@Param('id') id: string) {
    return this.accountsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Criar conta recorrente' })
  create(@Body() dto: CreateRecurringAccountDto) {
    return this.accountsService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar conta recorrente' })
  update(@Param('id') id: string, @Body() dto: UpdateRecurringAccountDto) {
    return this.accountsService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover conta recorrente' })
  remove(@Param('id') id: string) {
    return this.accountsService.remove(id);
  }
}
