// data-source.ts (корень проекта)
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import typeOrmConfig from './typeorm.config'; // теперь это работает корректно


// Загружаем переменные окружения из .env, т.к. при запуске через CLI NestJS ConfigModule не выполняется
import * as dotenv from 'dotenv';
dotenv.config();

// Создаём экземпляр DataSource на основе нашей конфигурации
export const AppDataSource = new DataSource({
  ...typeOrmConfig,
  // Явно указываем параметры, специфичные для CLI, если нужно переопределить
  // В данном случае наши пути к entities и migrations уже указаны в typeOrmConfig.
});
