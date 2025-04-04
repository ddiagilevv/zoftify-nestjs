import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(RequestLoggerMiddleware.name);

  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();

    const { method, originalUrl } = req;
    this.logger.log(`Incoming Request: ${method} ${originalUrl} - Start`);

    res.on('finish', () => {
      const end = Date.now();
      const timeTaken = end - start;
      this.logger.log(
        `Outgoing Response: ${method} ${originalUrl} - End. Time taken: ${timeTaken}ms`,
      );
    });

    next();
  }
}
