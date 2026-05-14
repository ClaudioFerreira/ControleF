import { IsString, IsNumber, IsDateString, IsEnum, IsOptional, Min, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { InvestmentType } from '@prisma/client';

export class CreateInvestmentDto {
  @ApiProperty({ example: 'Tesouro Selic 2027' })
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty({ enum: InvestmentType, example: 'FIXED_INCOME' })
  @IsEnum(InvestmentType)
  type: InvestmentType;

  @ApiProperty({ example: 5000.0 })
  @IsNumber()
  @Min(0.01)
  investedValue: number;

  @ApiProperty({ example: 5320.0 })
  @IsNumber()
  @Min(0)
  currentValue: number;

  @ApiProperty({ example: '2024-01-10' })
  @IsDateString()
  date: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  notes?: string;
}
