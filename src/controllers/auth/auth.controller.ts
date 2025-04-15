import * as AuthService from '@/service/auth/auth.service';
import { NextFunction, Request, Response } from 'express';
import HttpStatus from 'http-status-codes';
import bcrypt from 'bcryptjs';

export async function registerUser(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const password = await bcrypt.hash(req.body.password, 8);

    const response = await AuthService.registerUser({
      ...req.body,
      password,
    });

    res.status(HttpStatus.OK).json(response);
  } catch (error) {
    return next(error);
  }
}
