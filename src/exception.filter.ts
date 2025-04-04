import {
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
    ExceptionFilter,
  } from '@nestjs/common';
  import { Request, Response } from 'express';
  
  @Catch()
  export class GlobalExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const request = ctx.getRequest<Request>();
  
      // Determine status code
      const status =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;
  
      // Build error response
      const errorResponse = {
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: exception.message || 'Internal server error',
      };
  
      // You could also log it
      console.error('GlobalExceptionFilter:', exception);
  
      response.status(status).json(errorResponse);
    }
  }
  