import { Module } from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { StadiumModule } from './stadium/stadium.module';
import { UserModule } from './user/user.module';
import { CafeteriaModule } from './cafeteria/cafeteria.module';
import { CrawlingModule } from './crawling/crawling.module';
import { FileBlobModule } from './file-blob/file-blob.module';
import { PrismaService } from './prisma.service';
import { CrawlingService } from './crawling/crawling.service';
import { AzureStorageModule } from './azure-storage/azure-storage.module';
import { ScheduleModule } from '@nestjs/schedule';
import { MailModule } from './mail/mail.module';
import { CacheModule } from '@nestjs/cache-manager';
import { RecommendationsModule } from './recommendations/recommendations.module';
import { PlayerRecommandModule } from './player-recommand/player-recommand.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { redisStore } from 'cache-manager-ioredis-yet';
import { CacheConfigModule } from './cache/cache.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    // CacheModule.registerAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: async (config: ConfigService) => ({
    //     store: await redisStore({
    //       host: config.get('REDIS_HOST', 'redis'),
    //       port: config.get('REDIS_PORT', 6379),
    //     }),
    //     ttl: 60000,
    //   }),
    // }),
    AuthModule,
    StadiumModule,
    RecommendationsModule,
    UserModule,
    CafeteriaModule,
    CrawlingModule,
    FileBlobModule,
    AzureStorageModule,
    MailModule,
    PlayerRecommandModule,
    CacheConfigModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    CrawlingService,
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: CacheInterceptor,
    // },
  ],
})
export class AppModule {}
