import { Injectable } from '@nestjs/common';
import { UsersService } from '@/domain/users/users.service';
import { CreateUserDto } from '@/domain/users/dto/createUser.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async signUp(user: CreateUserDto) {
    return await this.userService.createUser(user);
  }
}
