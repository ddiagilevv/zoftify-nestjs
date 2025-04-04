"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const global_exception_filter_1 = require("./common/filters/global-exception.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    // Глобальные пайпы (валидация DTO)
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true, // автоматически преобразуем типы (например, к number)
    }));
    // Глобальный фильтр для обработки ошибок
    app.useGlobalFilters(new global_exception_filter_1.GlobalExceptionFilter());
    // Устанавливаем префикс API, если нужно
    app.setGlobalPrefix('api');
    const port = process.env.PORT || 3000;
    await app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}/api`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map