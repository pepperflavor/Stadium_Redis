import { Module } from '@nestjs/common';
import { CrawlingService } from './crawling.service';
import { CrawlingController } from './crawling.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [CrawlingController],
  providers: [CrawlingService, PrismaService],
})
export class CrawlingModule {}
