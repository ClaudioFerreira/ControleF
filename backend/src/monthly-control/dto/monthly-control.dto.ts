import { IsNumber, IsOptional, Min, Max, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GenerateSnapshotDto {
  @ApiProperty({ example: 3, description: 'Mês (1-12)' })
  @IsNumber()
  @Min(1)
  @Max(12)
  month: number;

  @ApiProperty({ example: 2024 })
  @IsNumber()
  @Min(2000)
  year: number;
}

export class UpdateSnapshotDto {
  @ApiProperty({ example: 8500.0, required: false })
  @IsNumber()
  @Min(0)
  @IsOptional()
  income?: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  notes?: string;
}

export class UpdateEntryStatusDto {
  @ApiProperty({ example: 'PAID' })
  @IsString()
  status: string;
}
