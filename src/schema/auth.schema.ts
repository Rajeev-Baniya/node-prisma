import { z } from 'zod';

export const UserRegisterSchema = z.object({
  email: z.string().email('This is not a valid email'),
  password: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  image: z.string().optional(),
});

export type TUserRegisterSchema = z.infer<typeof UserRegisterSchema>;
