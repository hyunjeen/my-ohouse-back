import { PickType } from '@nestjs/swagger';
import { SignInResponseDto } from '@/domain/auth/dto/response/signInResponse.dto';

export class SignInResultDto extends PickType(SignInResponseDto, [
  'user',
  'accessToken',
]) {
  refreshToken: string;
}
