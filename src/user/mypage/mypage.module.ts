import { forwardRef, Module } from '@nestjs/common';
import { MypageService } from './mypage.service';
import { MypageController } from './mypage.controller';
import { PrismaService } from 'src/prisma.service';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from '../user.module';

@Module({
  imports: [forwardRef(() => UserModule), forwardRef(() => AuthModule)],
  providers: [MypageService, PrismaService],
  controllers: [MypageController],
  exports: [MypageService],
})
export class MypageModule {}
