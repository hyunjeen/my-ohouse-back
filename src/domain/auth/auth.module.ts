import { Module } from '@nestjs/common';
import { AuthController } from '@/domain/auth/auth.controller';
import { AuthService } from '@/domain/auth/auth.service';
import { UsersModule } from '@/domain/users/users.module';
import { TokenService } from '@/domain/auth/token/token.service';
import { JwtStrategy } from '@/strategies/jwt.strategy';

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [AuthService, TokenService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
