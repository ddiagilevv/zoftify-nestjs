"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmConfig = void 0;
const path_1 = require("path");
require("dotenv/config");
exports.typeOrmConfig = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [(0, path_1.join)(__dirname, '..', '**', '*.entity.{ts,js}')],
    synchronize: true, // For dev only
    // logging: true,   // enable if you want to see SQL logs
};
