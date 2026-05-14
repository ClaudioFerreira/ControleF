import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AccountsModule } from './accounts/accounts.module';
import { InstallmentsModule } from './installments/installments.module';
import { ExpensesModule } from './expenses/expenses.module';
import { InvestmentsModule } from './investments/investments.module';
import { MonthlyControlModule } from './monthly-control/monthly-control.module';

@Module({
  imports: [
    // Carrega variáveis de ambiente do .env globalmente
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AccountsModule,
    InstallmentsModule,
    ExpensesModule,
    InvestmentsModule,
    MonthlyControlModule,
  ],
})
export class AppModule {}
