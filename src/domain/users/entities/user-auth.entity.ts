import { Exclude } from 'class-transformer';
import { Column, Entity, OneToOne } from 'typeorm';
import { UserEntity } from '@/domain/users/entities/user.entity';
import { AbstractEntity } from '@/common/entities/abstract.entity';
import { RoleType } from '@/common/constants/role-type';

@Entity({ name: 'authentications' })
export class UserAuthEntity extends AbstractEntity {
  @OneToOne(() => UserEntity, (user: UserEntity) => user.authentication)
  @Exclude()
  public user: UserEntity;

  @Column({ type: 'enum', enum: RoleType, default: RoleType.USER })
  public role: RoleType;

  @Column()
  @Exclude()
  public password: string;
}
