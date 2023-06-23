import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from '@/common/entities/abstract.entity';
import { SubcategoryEntity } from '@/domain/categories/entities/subcategory.entity';

@Entity('categories')
export class CategoryEntity extends AbstractEntity {
  @Column()
  name: string;

  @OneToMany(() => SubcategoryEntity, (subcategory) => subcategory.category)
  subcategories: SubcategoryEntity[];
}
