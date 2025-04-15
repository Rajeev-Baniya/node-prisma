import { authRouter } from '@/routes/auth/auth.routes';
import express from 'express';

export const mainRouter = express.Router({
  mergeParams: true,
});

mainRouter.use('/auth', authRouter);
