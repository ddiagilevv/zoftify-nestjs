import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { GlobalExceptionFilter } from './exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Apply global validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Apply global exception filter
  app.useGlobalFilters(new GlobalExceptionFilter());

  await app.listen(3000);
  console.log('Application is running on http://localhost:3000');
}
bootstrap();
