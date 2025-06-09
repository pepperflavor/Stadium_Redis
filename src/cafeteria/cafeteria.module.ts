import { Module } from '@nestjs/common';
import { CafeteriaService } from './cafeteria.service';
import { CafeteriaController } from './cafeteria.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [CafeteriaController],
  providers: [CafeteriaService, PrismaService],
})
export class CafeteriaModule {}
