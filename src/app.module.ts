import { Module } from '@nestjs/common';
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
import * as redisStore from 'cache-manager-ioredis';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.dev'],
    }),
    ScheduleModule.forRoot(),
    AuthModule,
    StadiumModule,
    RecommendationsModule,
    UserModule,
    CafeteriaModule,
    CrawlingModule,
    FileBlobModule,
    AzureStorageModule,
    MailModule,
    CacheModule.register({
      isGlobal: true,
      imports: [ConfigModule],
      injects: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        store: redisStore,
        host: config.get('REDIS_HOST') || 'localhost',
        port: parseInt(config.get('REDIS_PORT') || '6379'),
        ttl: 60 * 60 * 24, // 1 day
      }),
    }),
    PlayerRecommandModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, CrawlingService],
})
export class AppModule {}
