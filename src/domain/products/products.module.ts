import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from '@/domain/products/entities/product.entity';
import { JwtStrategy } from '@/strategies/jwt.strategy';
import { UsersModule } from '@/domain/users/users.module';
import { StorageService } from '@/storage/storage.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, JwtStrategy, StorageService],
  imports: [UsersModule, TypeOrmModule.forFeature([ProductEntity])],
})
export class ProductsModule {}
