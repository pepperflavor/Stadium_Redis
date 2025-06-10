import { Controller, Get, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Controller('redis-test')
export class RedisTestController {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  @Get()
  async testRedis() {
    await this.cacheManager.set('mykey', 'myvalue', 10000); // 10초 TTL
    const value = await this.cacheManager.get('mykey');
    return { value };
  }
}
