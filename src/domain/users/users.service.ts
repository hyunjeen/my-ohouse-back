import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { UserEntity } from '@/domain/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '@/domain/users/dto/createUser.dto';
import { UserDto } from '@/domain/users/dto/user.dto';
import { plainToInstance } from 'class-transformer';
import { AlreadyUserException } from '@/exception/already-user.exception';
import { TokenService } from '@/domain/auth/token/token.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly tokenService: TokenService,
    private readonly dataSource: DataSource,
  ) {}
  async findUser(option: Partial<{ email: string; uuid: string }>) {
    if (!option.email && !option.uuid) return null;
    const queryBuilder = this.userRepository.createQueryBuilder('user');
    if (option.email) {
      queryBuilder.orWhere('user.email = :email', { email: option.email });
    }
    if (option.uuid) {
      queryBuilder.orWhere('user.uuid = :uuid', { uuid: option.uuid });
    }
    return queryBuilder.getOne();
  }

  async createUser(
    createUserDto: CreateUserDto,
  ): Promise<{ user: UserDto; refreshToken: string }> {
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      const user = await queryRunner.manager.create(UserEntity, createUserDto);
      const userEntity = await queryRunner.manager.save(UserEntity, user);
      const refreshToken = this.tokenService.createRefreshToken(
        userEntity.uuid,
      );
      await this.updateUserRefreshToken(
        userEntity.uuid,
        refreshToken,
        queryRunner,
      );
      await queryRunner.commitTransaction();
      const userDto = plainToInstance(UserDto, userEntity, {
        excludeExtraneousValues: true,
      });
      return { user: userDto, refreshToken };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      if (error.errno === 1062) throw new AlreadyUserException();
      throw new InternalServerErrorException('server error');
    } finally {
      await queryRunner.release();
    }
  }

  async updateUserRefreshToken(
    uuid: string,
    refreshToken: string,
    queryRunner?: QueryRunner,
  ): Promise<void> {
    if (queryRunner) {
      await queryRunner.manager.update(UserEntity, { uuid }, { refreshToken });
    } else {
      await this.userRepository.update({ uuid }, { refreshToken });
    }
  }
}
