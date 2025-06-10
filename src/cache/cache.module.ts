import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { CacheService } from './cache.service';
import { redisStore } from 'cache-manager-ioredis-yet';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        store: await redisStore({
          host: config.get('REDIS_HOST', 'redis'),
          port: config.get('REDIS_PORT', 6379),
        }),
        ttl: 60000,
      }),
    }),
    ConfigModule,
  ],
  providers: [CacheService],
  exports: [CacheService, CacheModule],
})
export class CacheConfigModule {}
