import { Injectable } from '@nestjs/common';
import { UsersService } from '@/domain/users/users.service';
import { CreateUserDto } from '@/domain/users/dto/createUser.dto';
import { SignInDto } from '@/domain/auth/dto/signIn.dto';
import { NotFoundUserException } from '@/exception/not-found-user.exception';
import { Utils } from '@/utils';
import { NotValidatePasswordException } from '@/exception/not-validate-password.exception';
import { TokenService } from '@/domain/auth/token/token.service';
import { plainToInstance } from 'class-transformer';
import { UserDto } from '@/domain/users/dto/user.dto';
import { SignInResultDto } from '@/domain/auth/dto/signIn-result.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly tokenService: TokenService,
  ) {}

  async signIn(signInDto: SignInDto): Promise<SignInResultDto> {
    const userEntity = await this.userService.findUser({
      email: signInDto.email,
    });
    if (!userEntity) throw new NotFoundUserException();
    const isPasswordValid = this.validatePassword(
      signInDto.password,
      userEntity.password,
    );
    if (!isPasswordValid) throw new NotValidatePasswordException();
    const accessToken = this.tokenService.createToken(userEntity.uuid);
    const refreshToken = this.tokenService.createRefreshToken(userEntity.uuid);
    await this.userService.updateUserRefreshToken(
      userEntity.uuid,
      refreshToken,
    );
    const userDto = plainToInstance(UserDto, userEntity, {
      excludeExtraneousValues: true,
    });
    return {
      user: userDto,
      accessToken,
      refreshToken,
    };
  }
  async signUp(createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }
  private validatePassword(password, dbPassword): boolean {
    return Utils.validateHash(password, dbPassword);
  }
}
