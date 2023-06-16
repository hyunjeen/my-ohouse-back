import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '@/domain/auth/auth.service';
import { CreateUserDto } from '@/domain/users/dto/createUser.dto';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SignUpResponseDto } from '@/domain/auth/dto/response/signUpResponse.dto';
import { AlreadyUserException } from '@/domain/exception/already-user.exception';
import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiCreatedResponse({
    description: '성공',
    type: SignUpResponseDto,
  })
  @ApiException(() => AlreadyUserException)
  @ApiOperation({ summary: '회원가입' })
  @Post('/sign_up')
  async signUp(@Body() user: CreateUserDto): Promise<SignUpResponseDto> {
    const dbUser = await this.authService.signUp(user);
    return { user: dbUser };
  }
}
