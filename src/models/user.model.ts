import { ZERO } from '@/constants/numbers';
import Base from './Base.model';
import { Prisma, User } from '@prisma/client';

export default class UserModel extends Base {
  public static async exists(id: string): Promise<boolean> {
    const count = await this.pgClient.user.count({ where: { id } });

    return count > ZERO;
  }

  public static async create(
    data: Prisma.UserCreateInput,
  ): Promise<Omit<User, 'password'>> {
    return this.pgClient.user.create({
      data,
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        email: true,
        firstName: true,
        lastName: true,
        image: true,
      },
    });
  }
}
