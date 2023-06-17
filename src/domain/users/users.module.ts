import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@/domain/users/entities/user.entity';
import { UsersController } from '@/domain/users/users.controller';
import { UsersService } from '@/domain/users/users.service';
import { TokenService } from '@/domain/auth/token/token.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [UsersService, TokenService],
  exports: [UsersService],
})
export class UsersModule {}
