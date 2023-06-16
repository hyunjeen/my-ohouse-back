import { PickType } from '@nestjs/swagger';
import { UserEntity } from '@/domain/users/entities/user.entity';

export class CreateUserDto extends PickType(UserEntity, [
  'email',
  'name',
  'password',
]) {}
