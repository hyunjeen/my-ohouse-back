import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from '@/domain/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '@/domain/users/dto/createUser.dto';
import { UserDto } from '@/domain/users/dto/user.dto';
import { plainToInstance } from 'class-transformer';
import { AlreadyUserException } from '@/domain/exception/already-user.exception';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(user: CreateUserDto): Promise<UserDto> {
    try {
      const _user = await this.userRepository.create(user);
      const dbUser = await this.userRepository.save(_user);
      return plainToInstance(UserDto, dbUser, {
        excludeExtraneousValues: true,
      });
    } catch (error) {
      console.log(error);
      if (error.errno === 1062) throw new AlreadyUserException();
    }
  }
}
