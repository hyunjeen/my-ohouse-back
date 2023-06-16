import { PickType } from '@nestjs/swagger';
import { UserEntity } from '@/domain/users/entities/user.entity';

export class UserDto extends PickType(UserEntity, ['email', 'name'] as const) {}
