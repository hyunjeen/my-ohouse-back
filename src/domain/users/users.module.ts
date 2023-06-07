import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@/domain/users/entities/user.entity';
import { UsersController } from '@/domain/users/users.controller';
import { UsersService } from '@/domain/users/services/users.service';
import { UsersAuthService } from '@/domain/users/services/users-auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [UsersService, UsersAuthService],
  exports: [UsersService, UsersAuthService],
})
export class UsersModule {}
