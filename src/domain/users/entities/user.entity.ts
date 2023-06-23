import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '@/common/entities/abstract.entity';
import { RoleType } from '@/common/constants/role-type';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

@Entity('users')
export class UserEntity extends AbstractEntity {
  @ApiProperty({
    example: '홍길동',
    description: '이름',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Column()
  @Expose()
  public name: string;

  @ApiProperty({
    example: 'abc@gamil.com',
    description: '이메일',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @Column({ unique: true })
  @Expose()
  public email: string;

  @ApiProperty({
    example: '영문 & 대소문자 & 특수문자 & 8자 ~ 16자',
    description: '비밀번호',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Column()
  public password: string;

  @Column({ type: 'enum', enum: RoleType, default: RoleType.USER })
  @Expose()
  public role: RoleType;

  @Column({ default: null, nullable: true })
  @Expose()
  public refreshToken: string;
}
