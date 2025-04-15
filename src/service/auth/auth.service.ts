import UserModel from '@/models/user.model';
import getLogger from '@/utils/logger';
import { Prisma, User } from '@prisma/client';

const logger = getLogger({
  file: 'auth.ts',
  module: 'service',
  path: '/src/service/auth/auth.ts',
});

export async function registerUser(
  data: Prisma.UserCreateInput,
): Promise<Omit<User, 'password'>> {
  try {
    const user = await UserModel.create(data);

    return user;
  } catch (error) {
    logger.error(error);
    throw error;
  }
}
