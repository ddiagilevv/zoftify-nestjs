// src/typeorm.config.ts
import { DataSourceOptions } from 'typeorm';
import { configuration } from './config/configuration';
import * as dotenv from 'dotenv';
dotenv.config();

const config = configuration();

const typeOrmConfig: DataSourceOptions = {
  type: 'postgres',
  host: config.database.host,
  port: config.database.port,
  username: config.database.username,
  password: config.database.password,
  database: config.database.name,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  synchronize: false,
};

export default typeOrmConfig;
