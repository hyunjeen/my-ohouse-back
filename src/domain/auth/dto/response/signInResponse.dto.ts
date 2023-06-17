import { PickType } from '@nestjs/swagger';
import { SignUpResponseDto } from '@/domain/auth/dto/response/signUpResponse.dto';

export class SignInResponseDto extends PickType(SignUpResponseDto, [
  'user',
  'accessToken',
]) {}
