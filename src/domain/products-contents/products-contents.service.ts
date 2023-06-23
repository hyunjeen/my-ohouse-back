import { Injectable } from '@nestjs/common';
import { ProductContentsEntity } from '@/domain/products-contents/entities/product-content.entity';
import { QueryRunner } from 'typeorm';

@Injectable()
export class ProductsContentsService {
  create(contents: string, queryRunner: QueryRunner) {
    const _content = queryRunner.manager.create(ProductContentsEntity, {
      contents,
    });
    return queryRunner.manager.save(_content);
  }
}
