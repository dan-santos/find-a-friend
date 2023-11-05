import { env } from 'src/env';
import { PrismaClient } from '@prisma/client';

export class PrismaAdapter extends PrismaClient {
  constructor() {
    super({
      log: env.NODE_ENV === 'dev' ? ['query'] : []
    });
  }
}