import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from '@/domain/users/services/users.service';
import { AuthUser } from '@/decorators/auth-user.decorator';
import { UserEntity } from '@/domain/users/entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  async getUserData(@AuthUser() user: UserEntity): Promise<UserEntity> {
    return await this.usersService.findUser({ uuid: user.uuid });
  }
}
