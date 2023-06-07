import { Injectable } from '@nestjs/common';
import { QueryRunner, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@/domain/users/entities/user.entity';
import { UserAuthEntity } from '@/domain/users/entities/user-auth.entity';
import { RegisterDto } from '@/domain/auth/dtos/register.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findUser(
    options: Partial<{ uuid: string; email: string }>,
  ): Promise<UserEntity | undefined> {
    const queryBuilder = this.userRepository.createQueryBuilder('user');
    if (options.uuid) {
      queryBuilder.orWhere('user.uuid = :uuid', { uuid: options.uuid });
    }
    if (options.email) {
      queryBuilder.orWhere('user.email = :email', { email: options.email });
    }

    return queryBuilder.getOne();
  }

  async createUser(
    createUserDto: RegisterDto,
    authentication: UserAuthEntity,
    queryRunner: QueryRunner,
  ): Promise<UserEntity> {
    const user = this.userRepository.create({
      ...createUserDto,
      authentication,
    });

    return queryRunner.manager.save(user);
  }
}
