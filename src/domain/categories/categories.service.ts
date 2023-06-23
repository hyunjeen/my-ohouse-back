import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CategoryEntity } from '@/domain/categories/entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SubcategoryEntity } from '@/domain/categories/entities/subcategory.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
    @InjectRepository(SubcategoryEntity)
    private readonly subcategoryRepository: Repository<SubcategoryEntity>,
  ) {}
  async findAll() {
    return this.categoryRepository.find();
  }
  async findAllSub(uuid: string) {
    const result = await this.categoryRepository.findOne({
      where: { uuid },
      relations: ['subcategories'],
    });
    return result.subcategories;
  }
  async find(uuid: string) {
    return this.categoryRepository.findOne({ where: { uuid } });
  }
  async create(name: string) {
    const category = this.categoryRepository.create({ name });
    const result = await this.categoryRepository.save(category);
    return result.uuid;
  }

  async createSub(uuid: string, name: string) {
    const category = await this.find(uuid);
    const subcategory = this.subcategoryRepository.create({
      name,
    });
    const result = await this.subcategoryRepository.save({
      category,
      ...subcategory,
    });
    return this.subcategoryRepository.find({
      where: { uuid: result.uuid },
      relations: ['category'],
    });
  }
}
