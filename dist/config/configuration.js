"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configuration = void 0;
const configuration = () => ({
    port: parseInt(process.env.PORT ?? '3000', 10),
    database: {
        host: process.env.DB_HOST ?? 'localhost',
        port: parseInt(process.env.DB_PORT ?? '5432', 10),
        username: process.env.DB_USERNAME ?? 'postgres',
        password: process.env.DB_PASSWORD ?? 'postgres',
        name: process.env.DB_NAME ?? 'nestjs_db',
    },
    jwt: {
        secret: process.env.JWT_SECRET ?? 'mySuperSecretKey',
        expiresIn: process.env.JWT_EXPIRES_IN ?? '3600',
    },
});
exports.configuration = configuration;
//# sourceMappingURL=configuration.js.map