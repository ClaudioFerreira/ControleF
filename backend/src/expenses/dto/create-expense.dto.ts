import { IsString, IsNumber, IsDateString, IsEnum, IsOptional, Min, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ExpenseCategory } from '@prisma/client';

export class CreateExpenseDto {
  @ApiProperty({ example: 'Supermercado Extra' })
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty({ example: 320.50 })
  @IsNumber()
  @Min(0.01)
  value: number;

  @ApiProperty({ example: '2024-03-15' })
  @IsDateString()
  date: string;

  @ApiProperty({ enum: ExpenseCategory, example: 'FOOD' })
  @IsEnum(ExpenseCategory)
  category: ExpenseCategory;

  @ApiProperty({ example: 'Compra mensal', required: false })
  @IsString()
  @IsOptional()
  notes?: string;
}
