import { Column, Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { SubcategoryEntity } from '@/domain/categories/entities/subcategory.entity';
import { AbstractEntity } from '@/common/entities/abstract.entity';
import { ProductImageEntity } from '@/domain/product-image/entities/product-image.entity';
import { IsNumber, ValidateNested } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { JoinColumn } from 'typeorm';
import { ProductContentsEntity } from '@/domain/products-contents/entities/product-content.entity';

@Entity('products')
export class ProductEntity extends AbstractEntity {
  @Column()
  title: string;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Column('decimal')
  price: number;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Column('int')
  stock: number;

  @ManyToOne(() => SubcategoryEntity, (subcategory) => subcategory.products, {
    nullable: true,
  })
  @JoinColumn({ name: 'subcategories_uuid', referencedColumnName: 'uuid' })
  subcategory: SubcategoryEntity;

  @OneToOne(() => ProductContentsEntity, (contents) => contents.product)
  @JoinColumn({ name: 'contents_id' })
  contents: ProductContentsEntity;

  @OneToMany(() => ProductImageEntity, (productImg) => productImg.product)
  @ValidateNested({ each: true })
  @Type(() => ProductImageEntity)
  productImg: ProductImageEntity[];
}
