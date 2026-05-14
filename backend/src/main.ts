import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS habilitado para desenvolvimento homelab (ajuste origens em produção)
  app.enableCors({ origin: '*' });

  // Validação global via class-validator em todos os DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,       // remove campos não declarados no DTO
      forbidNonWhitelisted: true,
      transform: true,       // converte tipos automaticamente (string → number, etc.)
    }),
  );

  // Swagger UI disponível em /api
  const config = new DocumentBuilder()
    .setTitle('ControleF API')
    .setDescription('API do sistema de controle financeiro pessoal — compatível com n8n')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`🚀 ControleF API rodando em http://localhost:${port}`);
  console.log(`📚 Swagger UI em http://localhost:${port}/api`);
}
bootstrap();
