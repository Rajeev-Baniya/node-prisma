import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import HttpStatus from 'http-status-codes';
import ServiceError from '../utils/errors/ServiceErrors';
import getLogger from '../utils/logger';
import { Prisma } from '@prisma/client';

interface CustomerError extends Error {
  status?: number;
  data?: unknown;
}

const logger = getLogger({
  file: 'ErrorHandler.ts',
  module: 'ErrorHandler',
  path: '/utils/ErrorHandler.ts',
});

export function GenericErrorHandler(
  error: CustomerError,
  req: Request,
  res: Response,
  next: NextFunction,
): Response | void {
  if (!error) {
    next();
  }

  if (error instanceof ServiceError) {
    return res.status(error.status).json(error.data);
  }

  logger.error(error);

  if (error instanceof z.ZodError) {
    return res.status(HttpStatus.BAD_REQUEST).json({
      message: 'Input validation failed',
      errors: error.errors,
    });
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      const target = error.meta?.target;

      return res.status(HttpStatus.CONFLICT).json({
        message: target ? `${target} must be unique` : 'Something went wrong',
      });
    } else if (error.code == 'P2003') {
      // Foreign key constraint failed
      const modelName = error.meta?.modelName;

      return res.status(HttpStatus.CONFLICT).json({
        message:
          'Cannot perform this action on ' +
          (modelName || 'this entity') +
          ' as it is used in another table',
      });
    }
  }

  if (error instanceof SyntaxError && 'body' in error) {
    return res.status(HttpStatus.BAD_REQUEST).json({
      message: 'Invalid JSON payload, please check request body and try again.',
    });
  }

  return res
    .status(error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    .json({ message: 'Server failed to comprehend API request.' });
}
