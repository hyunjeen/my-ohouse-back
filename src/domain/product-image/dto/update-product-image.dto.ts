import { PartialType } from '@nestjs/swagger';
import { CreateProductImageDto } from '../../../../dist/domain/product-image/dto/create-product-image.dto';

export class UpdateProductImageDto extends PartialType(CreateProductImageDto) {}
