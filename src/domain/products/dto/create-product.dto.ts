import { ApiProperty, PickType, IntersectionType } from '@nestjs/swagger';
import { ProductEntity } from '@/domain/products/entities/product.entity';
import { ProductContentsEntity } from '@/domain/products-contents/entities/product-content.entity';

export class CreateProductDto extends IntersectionType(
  PickType(ProductEntity, ['price', 'stock', 'title']),
  PickType(ProductContentsEntity, ['contents']),
) {
  @ApiProperty({
    title: 'images',
    type: 'array',
    description: 'products images',
  })
  images: Express.Multer.File[];

  category: string;
  subcategory: string;
}
