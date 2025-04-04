import { Module, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configuration } from './config/configuration';
import { typeormConfig } from './database/typeorm.config';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RequestLoggerMiddleware } from './common/middleware/request-logger.middleware';

@Module({
  imports: [
    // Подключаем ConfigModule (чтобы уметь читать из .env)
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    // Подключаем TypeORM
    TypeOrmModule.forRootAsync({
      useFactory: () => typeormConfig,
    }),
    // Модули приложения
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    // Подключение middleware для логирования времени запроса
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
