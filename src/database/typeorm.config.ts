import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { configuration } from '../config/configuration';
import { User } from '../users/entities/user.entity';

const config = configuration();

export const typeormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: config.database.host,
  port: config.database.port,
  username: config.database.username,
  password: config.database.password,
  database: config.database.name,
  entities: [User],
  synchronize: true, // в продакшене лучше false + миграции
  logging: false,
};
