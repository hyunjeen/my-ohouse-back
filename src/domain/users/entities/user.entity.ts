import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { AbstractEntity } from '@/common/entities/abstract.entity';
import { UserAuthEntity } from '@/domain/users/entities/user-auth.entity';

@Entity()
export class UserEntity extends AbstractEntity {
  @Column()
  public name: string;

  @Column({ unique: true })
  public email: string;

  @OneToOne(
    () => UserAuthEntity,
    (authentication: UserAuthEntity) => authentication.user,
    { eager: false, nullable: false, onDelete: 'CASCADE' },
  )
  @JoinColumn()
  @Index()
  public authentication: UserAuthEntity;
}
