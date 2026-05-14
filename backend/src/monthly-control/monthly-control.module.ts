import { Module } from '@nestjs/common';
import { MonthlyControlService } from './monthly-control.service';
import { MonthlyControlController } from './monthly-control.controller';

@Module({
  controllers: [MonthlyControlController],
  providers: [MonthlyControlService],
})
export class MonthlyControlModule {}
