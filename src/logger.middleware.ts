import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();
    const { method, originalUrl } = req;

    this.logger.log(`--> Request Start: [${method}] ${originalUrl}`);

    res.on('finish', () => {
      const end = Date.now();
      const timeTaken = end - start;
      this.logger.log(`<-- Request End: [${method}] ${originalUrl} | ${timeTaken}ms`);
    });

    next();
  }
}
