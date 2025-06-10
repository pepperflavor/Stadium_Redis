import { Injectable } from '@nestjs/common';
import { CacheOptionsFactory, CacheModuleOptions } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store'; // Redis를 사용할 경우
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CacheConfigService implements CacheOptionsFactory {
  constructor(private configService: ConfigService) {}

  createCacheOptions(): CacheModuleOptions {
    return {
      isGlobal: true, // 전역으로 캐시 사용
      store: redisStore, // Redis 사용 (선택)
      host: this.configService.get('REDIS_HOST', 'redis'), // 환경변수에서 읽거나 기본값으로 'redis' 사용
      port: this.configService.get('REDIS_PORT', 6379),
      ttl: 60000,
    };
  }
}
