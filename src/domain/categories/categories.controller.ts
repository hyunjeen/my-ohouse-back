import { Controller, Get, Post, Query } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async findAll(@Query('id') id: string) {
    if (id) {
      return await this.categoriesService.findAllSub(id);
    }
    return this.categoriesService.findAll();
  }
  @Post()
  create() {
    this.categoriesService.create();
  }
  @Post('sub')
  createSub() {
    this.categoriesService.createSub();
  }
}
