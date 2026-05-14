import { IsString, IsEnum, IsNumber, IsBoolean, Min, Max, IsOptional, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AccountCategory } from '@prisma/client';

export class CreateRecurringAccountDto {
  @ApiProperty({ example: 'Conta de Energia' })
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty({ enum: AccountCategory, example: 'ENERGY' })
  @IsEnum(AccountCategory)
  category: AccountCategory;

  @ApiProperty({ example: 150.0 })
  @IsNumber()
  @Min(0.01)
  averageValue: number;

  @ApiProperty({ example: 10, description: 'Dia do mês de vencimento (1-31)' })
  @IsNumber()
  @Min(1)
  @Max(31)
  dueDay: number;

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
