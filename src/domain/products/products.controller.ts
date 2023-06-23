import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFiles,
  Get,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from '@/domain/products/dto/create-product.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Get()
  async getProducts() {
    return await this.productsService.findAll();
  }

  @Post('new')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'images', maxCount: 5 }, // maxCount is the maximum number of files
    ]),
  )
  async create(
    @Body() data: CreateProductDto,
    @UploadedFiles() file: { images: Express.Multer.File[] },
  ) {
    await this.productsService.create(data, file.images);
    return { message: '상품 등록에 성공했습니다' };
  }
}
