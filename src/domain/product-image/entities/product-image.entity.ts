import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ProductEntity } from '@/domain/products/entities/product.entity';
import { AbstractEntity } from '@/common/entities/abstract.entity';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

@Entity('product_img')
export class ProductImageEntity extends AbstractEntity {
  @IsString()
  @IsNotEmpty()
  @Column()
  url: string;

  @IsBoolean()
  @Column('bool')
  isThumbnail: boolean;

  @ManyToOne(() => ProductEntity, (product) => product.productImg)
  @JoinColumn()
  product: ProductEntity;
}
