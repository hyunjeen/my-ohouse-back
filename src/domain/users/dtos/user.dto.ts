import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserAuthDto } from '@/domain/users/dtos/user-auth.dto';
import { Exclude } from 'class-transformer';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @IsOptional()
  @Exclude()
  readonly authentication?: UserAuthDto;
}
