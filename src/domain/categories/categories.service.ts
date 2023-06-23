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
  async create() {
    const category = this.categoryRepository.create({ name: '의류' });
    await this.categoryRepository.save(category);
  }

  async createSub() {
    const category = await this.find('83857f3c-b8d4-4d09-bbe5-4f2460864a33');
    const subcategory = this.subcategoryRepository.create({
      name: '바지',
    });
    await this.subcategoryRepository.save({ category, ...subcategory });
  }
}
