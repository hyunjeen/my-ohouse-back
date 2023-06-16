import { UserDto } from '@/domain/users/dto/user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpResponseDto {
  @ApiProperty({ type: UserDto })
  user: UserDto;
}
