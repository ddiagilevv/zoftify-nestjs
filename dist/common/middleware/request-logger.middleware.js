"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var RequestLoggerMiddleware_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestLoggerMiddleware = void 0;
const common_1 = require("@nestjs/common");
let RequestLoggerMiddleware = RequestLoggerMiddleware_1 = class RequestLoggerMiddleware {
    constructor() {
        this.logger = new common_1.Logger(RequestLoggerMiddleware_1.name);
    }
    use(req, res, next) {
        const start = Date.now();
        const { method, originalUrl } = req;
        this.logger.log(`Incoming Request: ${method} ${originalUrl} - Start`);
        res.on('finish', () => {
            const end = Date.now();
            const timeTaken = end - start;
            this.logger.log(`Outgoing Response: ${method} ${originalUrl} - End. Time taken: ${timeTaken}ms`);
        });
        next();
    }
};
RequestLoggerMiddleware = RequestLoggerMiddleware_1 = __decorate([
    (0, common_1.Injectable)()
], RequestLoggerMiddleware);
exports.RequestLoggerMiddleware = RequestLoggerMiddleware;
//# sourceMappingURL=request-logger.middleware.js.map