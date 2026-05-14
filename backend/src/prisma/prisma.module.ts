import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

// Global: PrismaService disponível em todos os módulos sem re-importar
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
