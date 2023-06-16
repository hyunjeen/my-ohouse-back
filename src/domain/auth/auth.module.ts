import { Module } from '@nestjs/common';
import { AuthController } from '@/domain/auth/auth.controller';
import { AuthService } from '@/domain/auth/auth.service';
import { UsersModule } from '@/domain/users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
