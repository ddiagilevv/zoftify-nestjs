import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Глобальные пайпы (валидация DTO)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // удаляем поля, не описанные в DTO
      forbidNonWhitelisted: true, // бросаем ошибку, если есть лишние поля
      transform: true, // автоматически преобразуем типы (например, к number)
    }),
  );

  // Глобальный фильтр для обработки ошибок
  app.useGlobalFilters(new GlobalExceptionFilter());

  // Устанавливаем префикс API, если нужно
  app.setGlobalPrefix('api');

  const port = process.env.PORT || 3000;
  await app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/api`);
  });
}
bootstrap();
