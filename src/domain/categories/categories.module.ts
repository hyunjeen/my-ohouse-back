import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from '@/domain/categories/entities/category.entity';
import { SubcategoryEntity } from '@/domain/categories/entities/subcategory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity, SubcategoryEntity])],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
