"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeormConfig = void 0;
const configuration_1 = require("../config/configuration");
const user_entity_1 = require("../users/entities/user.entity");
const config = (0, configuration_1.configuration)();
exports.typeormConfig = {
    type: 'postgres',
    host: config.database.host,
    port: config.database.port,
    username: config.database.username,
    password: config.database.password,
    database: config.database.name,
    entities: [user_entity_1.User],
    synchronize: false,
    migrationsRun: true,
    migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
    logging: process.env.NODE_ENV !== 'production',
};
//# sourceMappingURL=typeorm.config.js.map