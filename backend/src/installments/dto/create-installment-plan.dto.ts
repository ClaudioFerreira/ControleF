import { IsString, IsNumber, IsDateString, Min, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateInstallmentPlanDto {
  @ApiProperty({ example: 'iPhone 15 - 12x' })
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty({ example: 6000.0 })
  @IsNumber()
  @Min(0.01)
  totalValue: number;

  @ApiProperty({ example: 12 })
  @IsNumber()
  @Min(1)
  totalInstallments: number;

  @ApiProperty({ example: 500.0 })
  @IsNumber()
  @Min(0.01)
  installmentValue: number;

  @ApiProperty({ example: '2024-01-15' })
  @IsDateString()
  startDate: string;
}
