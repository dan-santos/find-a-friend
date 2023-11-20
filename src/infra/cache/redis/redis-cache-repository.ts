import { ICacheRepository } from '../cache-repository';
import { RedisService } from './redis.service';

export class RedisCacheRepository implements ICacheRepository {
  private redis = new RedisService();

  async set(key: string, value: string): Promise<void> {
    await this.redis.set(key, value, 'EX', 60 * 15); // expires in 15min
  }

  async get(key: string): Promise<string | null> {
    const value = await this.redis.get(key);
    return value;
  }

  async delete(key: string): Promise<void> {
    await this.redis.del(key);
  }
}