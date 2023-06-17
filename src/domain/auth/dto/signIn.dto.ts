import { PickType } from '@nestjs/swagger';
import { UserEntity } from '@/domain/users/entities/user.entity';

export class SignInDto extends PickType(UserEntity, ['email', 'password']) {}
