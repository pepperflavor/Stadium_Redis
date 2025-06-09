import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches } from 'class-validator';

export class EmailSignInDto {
  @IsString()
  @ApiProperty({ example: 'cuteBat', description: '유저아이디, 유니크, 필수' })
  user_cus_id: string;

  @Matches(
    /^(?!^[a-zA-Z]+$)(?!^[0-9]+$)(?!^[^a-zA-Z0-9]+$)[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{8,16}$/,
    {
      message:
        '비밀번호는 영문, 숫자, 특수문자 중 2가지 이상 조합으로 8~16자여야 합니다.',
    },
  )
  @ApiProperty({ example: 'qwer!!234' })
  user_pwd: string;
}
