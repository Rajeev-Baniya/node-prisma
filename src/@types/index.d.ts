import { UserPayload } from '@/interfaces/auth.interface';

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload | undefined;
    }
  }
}
