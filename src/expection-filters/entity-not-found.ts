import { ArgumentsHost, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { ErrorFilter } from './dto/ErrorFilter';

export class EntityNotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: ErrorFilter, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    const statusCode = exception.status ?? HttpStatus.NOT_FOUND;
    const message = exception.response instanceof Object ? exception.response.message : [exception.message];

    return res.status(statusCode).json({ statusCode, message });
  }
}
