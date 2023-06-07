import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@/domain/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersAuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAuthUser(email: string): Promise<UserEntity | undefined> {
    const queryBuilder = this.userRepository.createQueryBuilder('user');
    queryBuilder.leftJoinAndSelect('user.authentication', 'auth');
    queryBuilder.orWhere('user.email = :email', { email });
    return queryBuilder.getOne();
  }
}
