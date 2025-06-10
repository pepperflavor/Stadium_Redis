import { Module } from '@nestjs/common';
import { CacheController } from './cache.controller';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
import { CacheService } from './cache.service';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        store: redisStore,
        host: config.get('REDIS_HOST'),
        port: config.get('REDIS_PORT'),
        ttl: config.get('CACHE_TTL'),
      }),
    }),
    ConfigModule,
  ],
  providers: [CacheService],
  exports: [CacheService, CacheModule],
})
export class CacheConfigModule {}
