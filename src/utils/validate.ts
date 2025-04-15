import { NextFunction, Request, RequestHandler, Response } from 'express';

/**
 * @description Validate the body of a request
 * @param {Zod.ZodTypeAny} schema schema of a body to validate
 * @returns {RequestHandler} Returns next middleware or error
 */
export function validateBody(schema: Zod.ZodTypeAny): RequestHandler {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);

      return next();
    } catch (error) {
      return next(error);
    }
  };
}

/**
 * @description Validate the params of a request
 * @param {Zod.AnyZodObject} schema schema of a params to validates
 * @returns {RequestHandler} Returns next middleware or error
 */
export function validateParams(schema: Zod.AnyZodObject): RequestHandler {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      schema.parse(req.params);

      return next();
    } catch (error) {
      return next(error);
    }
  };
}

/**
 * @description Validate the query of a request
 * @param {Zod.AnyZodObject} schema schema of query to validate
 * @returns {RequestHandler} Returns next middleware or error
 */
export function validateQuery(schema: Zod.AnyZodObject): RequestHandler {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      req.query = schema.parse(req.query);

      return next();
    } catch (error) {
      return next(error);
    }
  };
}
