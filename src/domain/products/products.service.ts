import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ProductEntity } from '@/domain/products/entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from '@/domain/products/dto/create-product.dto';
import { ProductContentsEntity } from '@/domain/products-contents/entities/product-content.entity';
import { SubcategoryEntity } from '@/domain/categories/entities/subcategory.entity';
import { StorageService } from '@/storage/storage.service';
import { ProductImageEntity } from '@/domain/product-image/entities/product-image.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    private readonly dataSource: DataSource,
    private readonly storageService: StorageService,
  ) {}
  async findAll() {
    const builder = this.dataSource
      .getRepository(ProductEntity)
      .createQueryBuilder('products');
    builder
      .leftJoinAndSelect('products.productImg', 'images')
      .where('images.isThumbnail = :isThumbnail', { isThumbnail: true });
    return await builder.getMany();
  }
  async create(
    createProductDto: CreateProductDto,
    file: Express.Multer.File[],
  ) {
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      await queryRunner.startTransaction();
      const _content = queryRunner.manager.create(ProductContentsEntity, {
        contents: createProductDto.contents,
      });
      const content = await queryRunner.manager.save(
        ProductContentsEntity,
        _content,
      );

      const subcategory = await queryRunner.manager.findOne(SubcategoryEntity, {
        where: { uuid: createProductDto.subcategory },
      });
      const _product = queryRunner.manager.create(ProductEntity, {
        title: createProductDto.title,
        price: createProductDto.price,
        stock: createProductDto.stock,
      });
      const imageResults = await this.storageService.uploadMultipleFiles(
        file,
        'ohhouse-products-images',
      );

      const product = await queryRunner.manager.save(ProductEntity, {
        contents: content,
        subcategory,
        ..._product,
      });
      const imageEntities = imageResults.map((result, index) => {
        const _image = queryRunner.manager.create(ProductImageEntity, {
          url: result.publicUrl,
          isThumbnail: index == 0,
        });

        return queryRunner.manager.save(ProductImageEntity, {
          product,
          ..._image,
        });
      });
      await Promise.all(imageEntities);
      await queryRunner.commitTransaction();
      return product;
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException('서버에서 오류가 발생했습니다');
    } finally {
      void queryRunner.release();
    }
  }
}
