import { UserDto } from '@/domain/users/dto/user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpResponseDto {
  @ApiProperty({ type: UserDto })
  user: UserDto;

  @ApiProperty({
    title: 'accessToken',
    example: 'hbGciOiJIUzI1NiIsInR5cCI6IkpXVC',
  })
  accessToken: string;
}
