import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '@/domain/users/users.module';
import { AuthService } from '@/domain/auth/auth.service';
import { AuthController } from '@/domain/auth/auth.controller';
import { UserAuthEntity } from '@/domain/users/entities/user-auth.entity';
import { JwtStrategy } from '@/domain/auth/strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([UserAuthEntity]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
