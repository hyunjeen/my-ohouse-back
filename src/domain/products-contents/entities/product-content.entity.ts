import { Column, Entity, OneToOne } from 'typeorm';
import { AbstractEntity } from '@/common/entities/abstract.entity';
import { ProductEntity } from '@/domain/products/entities/product.entity';

@Entity('product_contents')
export class ProductContentsEntity extends AbstractEntity {
  @OneToOne(() => ProductEntity, (product) => product.contents)
  product: ProductEntity;

  @Column()
  contents: string;
}
