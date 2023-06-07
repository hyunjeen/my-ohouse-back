import { IsNotEmpty, IsString } from 'class-validator';

export class UserAuthDto {
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
