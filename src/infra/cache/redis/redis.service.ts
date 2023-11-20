import { Redis } from 'ioredis';
import { env } from 'src/env';

export class RedisService extends Redis {
  constructor(){
    super({
      host: env.REDIS_HOST,
      port: env.REDIS_PORT,
      db: env.REDIS_DB,
      password: env.REDIS_PASSWORD,
    });
  }
}