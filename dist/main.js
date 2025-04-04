"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const exception_filter_1 = require("./exception.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    // Apply global validation
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    // Apply global exception filter
    app.useGlobalFilters(new exception_filter_1.GlobalExceptionFilter());
    await app.listen(3000);
    console.log('Application is running on http://localhost:3000');
}
bootstrap();
