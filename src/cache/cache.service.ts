import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Cache } from 'cache-manager';
import Redis from 'ioredis';

@Injectable()
export class CacheService implements OnModuleInit {
  private redisClient: Redis;

  async onModuleInit() {
    this.redisClient = new Redis({
      host: process.env.REDIS_HOST || 'redis',
      port: parseInt(process.env.REDIS_PORT || '6379', 10),
    });

    this.redisClient.on('error', (err) => {
      console.error('❌ Redis 연결 실패:', err);
    });

    const pong = await this.redisClient.ping();
    console.log('📦 Redis 직접 연결 상태:', pong); // 'PONG'이면 성공!
  }
}
