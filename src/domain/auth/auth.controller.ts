import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UserEntity } from '@/domain/users/entities/user.entity';
import { LoginDto } from '@/domain/auth/dtos/login.dto';
import { LoginResponseDto } from '@/domain/auth/dtos/login-response.dto';
import { RegisterDto } from '@/domain/auth/dtos/register.dto';
import { AuthService } from '@/domain/auth/auth.service';

@Controller('Authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async userLogin(@Body() userLoginDto: LoginDto): Promise<LoginResponseDto> {
    const user = await this.authService.validateUser(userLoginDto);
    const token = await this.authService.createToken(user);

    return { user, token };
  }

  @Post('registration')
  @HttpCode(HttpStatus.OK)
  async registration(
    @Body() registrationDto: RegisterDto,
  ): Promise<UserEntity> {
    return this.authService.registration(registrationDto);
  }
}
