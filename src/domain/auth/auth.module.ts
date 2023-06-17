import { Module } from '@nestjs/common';
import { AuthController } from '@/domain/auth/auth.controller';
import { AuthService } from '@/domain/auth/auth.service';
import { UsersModule } from '@/domain/users/users.module';
import { TokenService } from '@/domain/auth/token/token.service';

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [AuthService, TokenService],
  exports: [AuthService],
})
export class AuthModule {}
