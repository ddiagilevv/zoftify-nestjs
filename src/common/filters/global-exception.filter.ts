import {
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
    ExceptionFilter,
  } from '@nestjs/common';
  import { Response } from 'express';
  
  @Catch()
  export class GlobalExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost): void {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
  
      let status = HttpStatus.INTERNAL_SERVER_ERROR;
      let message = 'Internal server error';
  
      if (exception instanceof HttpException) {
        status = exception.getStatus();
        const exceptionResponse = exception.getResponse();
        // Если это объект, то берём message из него
        if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
          // @ts-ignore
          message = exceptionResponse.message || exception.message;
        } else {
          message = exception.message;
        }
      }
  
      response.status(status).json({
        statusCode: status,
        success: false,
        message,
      });
    }
  }
  