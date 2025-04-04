"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
// data-source.ts (корень проекта)
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const typeorm_config_1 = __importDefault(require("./typeorm.config")); // теперь это работает корректно
// Загружаем переменные окружения из .env, т.к. при запуске через CLI NestJS ConfigModule не выполняется
const dotenv = __importStar(require("dotenv"));
dotenv.config();
// Создаём экземпляр DataSource на основе нашей конфигурации
exports.AppDataSource = new typeorm_1.DataSource({
    ...typeorm_config_1.default,
    // Явно указываем параметры, специфичные для CLI, если нужно переопределить
    // В данном случае наши пути к entities и migrations уже указаны в typeOrmConfig.
});
//# sourceMappingURL=data-source.js.map