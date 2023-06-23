import { AbstractEntity } from '@/common/entities/abstract.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { CategoryEntity } from '@/domain/categories/entities/category.entity';
import { ProductEntity } from '@/domain/products/entities/product.entity';
@Entity('subcategories')
export class SubcategoryEntity extends AbstractEntity {
  @Column()
  name: string;

  @ManyToOne(() => CategoryEntity, (category) => category.subcategories)
  category: CategoryEntity;

  @OneToMany(() => ProductEntity, (product) => product.subcategory)
  products: ProductEntity[];
}
