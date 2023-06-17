import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from '@/domain/auth/auth.service';
import { CreateUserDto } from '@/domain/users/dto/createUser.dto';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SignUpResponseDto } from '@/domain/auth/dto/response/signUpResponse.dto';
import { AlreadyUserException } from '@/exception/already-user.exception';
import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import { TokenService } from '@/domain/auth/token/token.service';
import { Response } from 'express';
import { SignInDto } from '@/domain/auth/dto/signIn.dto';
import { SignInResponseDto } from '@/domain/auth/dto/response/signInResponse.dto';
import { NotValidatePasswordException } from '@/exception/not-validate-password.exception';
import { NotFoundUserException } from '@/exception/not-found-user.exception';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
  ) {}

  @ApiOperation({ summary: '로그인' })
  @ApiResponse({ description: '성공', type: SignInResponseDto })
  @ApiException(() => NotValidatePasswordException)
  @ApiException(() => NotFoundUserException)
  @Post('/sign_in')
  public async signIn(
    @Body() loginInfo: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<SignInResponseDto> {
    const { refreshToken, ...result } = await this.authService.signIn(
      loginInfo,
    );
    this.setRefreshTokenCookie(res, refreshToken);
    return result;
  }

  @ApiCreatedResponse({
    description: '성공',
    type: SignUpResponseDto,
  })
  @ApiException(() => AlreadyUserException)
  @ApiOperation({ summary: '회원가입' })
  @Post('/sign_up')
  public async signUp(
    @Body() user: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<SignUpResponseDto> {
    const { refreshToken, user: _user } = await this.authService.signUp(user);
    const accessToken = this.tokenService.createToken(_user.uuid);
    this.setRefreshTokenCookie(res, refreshToken);
    return { user: _user, accessToken: accessToken };
  }

  private setRefreshTokenCookie(res: Response, refreshToken: string) {
    res.cookie('refresh_token', refreshToken, { httpOnly: true, secure: true });
  }
}
