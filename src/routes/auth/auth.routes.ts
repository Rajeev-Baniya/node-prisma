import * as AuthController from '@/controllers/auth/auth.controller';
import * as AuthSchema from '@/schema/auth.schema';
import { validateBody } from '@/utils/validate';
import express from 'express';

export const authRouter = express.Router({
  mergeParams: true,
});

authRouter.post(
  '/register',
  validateBody(AuthSchema.UserRegisterSchema),
  AuthController.registerUser,
);
