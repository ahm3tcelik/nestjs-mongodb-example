import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DbExceptionFilter } from './core/filters/db-exception.filter';
import { HttpExceptionFilter } from './core/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.useGlobalFilters(
    new HttpExceptionFilter(),
    new DbExceptionFilter()
  );

  await app.listen(3000);
}
bootstrap();
