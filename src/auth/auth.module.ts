import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MypageModule } from '../user/mypage/mypage.module';
import { MailModule } from '../mail/mail.module';
import { CacheService } from '../cache/cache.service';
import { CacheConfigModule } from 'src/cache/cache.module';

@Module({
  imports: [
    UserModule,
    MypageModule,
    MailModule,

    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get('JWT_EXPIRE', '1h'),
        },
      }),
    }),
    CacheConfigModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, CacheService],
  exports: [AuthService],
})
export class AuthModule {}
