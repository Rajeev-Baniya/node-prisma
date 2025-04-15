import { Prisma, PrismaClient } from '@prisma/client';

import getLogger from '@/utils/logger';
import { TAny } from '@/schema/general.schema';

const logger = getLogger({
  filename: 'Base.ts',
  module: 'Model',
  path: '/model/Base.ts',
});

type PGClient = PrismaClient;

class Base {
  protected static pgClient: PGClient;

  public static async connect(): Promise<boolean> {
    logger.info('Connecting to postgres database.');
    try {
      const client = new PrismaClient();

      await client.$connect();

      await client.$executeRaw`select 1`;

      this.pgClient = client;

      logger.info('Executed test query: Success!');

      return true;
    } catch (err: unknown) {
      logger.error(err);
      throw err;
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/explicit-function-return-type
  public static get customClient() {
    const customClient = this.pgClient.$extends({
      name: 'findManyAndCount',
      model: {
        $allModels: {
          findManyAndCount<Model, Args>(
            this: Model,
            args: Prisma.Exact<Args, Prisma.Args<Model, 'findMany'>>,
          ): Promise<[Prisma.Result<Model, Args, 'findMany'>, number]> {
            return customClient.$transaction([
              (this as TAny).findMany(args),
              (this as TAny).count({ where: (args as TAny).where }),
            ]) as TAny;
          },
        },
      },
    });

    return customClient;
  }
}

export default Base;
