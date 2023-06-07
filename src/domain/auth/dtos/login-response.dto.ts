import { UserDto } from '@/domain/users/dtos/user.dto';
import { TokenDto } from '@/domain/auth/dtos/token.dto';

export class LoginResponseDto {
  readonly user: UserDto;

  readonly token: TokenDto;
}
