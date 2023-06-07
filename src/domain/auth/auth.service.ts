import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { UserAuthEntity } from '@/domain/users/entities/user-auth.entity';
import { UsersService } from '@/domain/users/services/users.service';
import { UserEntity } from '@/domain/users/entities/user.entity';
import { MySqlErrorCode } from '@/database/constraints/errors.constraint';
import { LoginDto } from '@/domain/auth/dtos/login.dto';
import { UserAlreadyExistException } from '@/domain/auth/exception/user-already.exception';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthenticationProvider } from '@/domain/auth/provider/authentication.provider';
import { RegisterDto } from '@/domain/auth/dtos/register.dto';
import { UserAuthDto } from '@/domain/users/dtos/user-auth.dto';
import { UsersAuthService } from '@/domain/users/services/users-auth.service';
import { UserNotFoundException } from '@/domain/auth/exception/user-not-found.exception';
import { UserPasswordNotValidException } from '@/domain/auth/exception/user-password-not-valid.exception';
import { JwtService } from '@nestjs/jwt';
import { TokenDto } from '@/domain/auth/dtos/token.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserAuthEntity)
    private readonly userAuthEntityRepository: Repository<UserAuthEntity>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
    private readonly usersAuthService: UsersAuthService,
    private readonly dataSource: DataSource,
  ) {}

  async registration(registrationData: RegisterDto): Promise<UserEntity> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const authentication = await this._createAuthUser(
        registrationData,
        queryRunner,
      );
      const user: UserEntity = await this.usersService.createUser(
        registrationData,
        authentication,
        queryRunner,
      );
      await queryRunner.commitTransaction();

      return user;
    } catch (error) {
      await queryRunner.rollbackTransaction();

      if (error?.errno === MySqlErrorCode.UniqueViolation) {
        throw new UserAlreadyExistException();
      }

      throw new InternalServerErrorException();
    } finally {
      await queryRunner.release();
    }
  }

  public async validateUser(userLoginDto: LoginDto): Promise<UserEntity> {
    const { email, password } = userLoginDto;
    const user = await this.usersAuthService.findAuthUser(email);

    if (!user) {
      throw new UserNotFoundException();
    }

    const isPasswordValid = await AuthenticationProvider.validateHash(
      password,
      user.authentication.password,
    );

    if (!isPasswordValid) {
      throw new UserPasswordNotValidException();
    }

    return user;
  }

  public async createToken(user: UserEntity): Promise<TokenDto> {
    const {
      uuid,
      authentication: { role },
    } = user;

    return {
      expiresIn: this.configService.get('JWT_EXPIRATION_TIME'),
      accessToken: await this.jwtService.signAsync({ uuid, role }),
    };
  }

  private async _createAuthUser(
    createAuthenticationDto: UserAuthDto,
    queryRunner: QueryRunner,
  ): Promise<UserAuthEntity> {
    const authentication = this.userAuthEntityRepository.create(
      createAuthenticationDto,
    );
    return queryRunner.manager.save(authentication);
  }
}
