import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import 'dotenv/config';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [join(__dirname, '..', '**', '*.entity.{ts,js}')],
  synchronize: true, // For dev only
  // logging: true,   // enable if you want to see SQL logs
};
