import { Injectable } from '@nestjs/common';
import { CacheOptionsFactory, CacheModuleOptions } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store'; // Redis를 사용할 경우

@Injectable()
export class CacheConfigService implements CacheOptionsFactory {
  createCacheOptions(): CacheModuleOptions {
    return {
      isGlobal: true, // 전역으로 캐시 사용
      store: redisStore, // Redis 사용 (선택)
      host: 'localhost', // Redis 호스트
      port: 6379, // Redis 포트
      ttl: 60000,
    };
  }
}
