import { Body, Controller, Get, Post, Query } from '@nestjs/common';
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
  create(@Body() data: { name: string }) {
    return this.categoriesService.create(data.name);
  }
  @Post('sub')
  createSub(@Body() data: { uuid: string; name: string }) {
    return this.categoriesService.createSub(data.uuid, data.name);
  }
}
