import { Module } from '@nestjs/common';
import { StadiumService } from './stadium.service';
import { StadiumController } from './stadium.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [StadiumController],
  providers: [StadiumService, PrismaService],
})
export class StadiumModule {}
