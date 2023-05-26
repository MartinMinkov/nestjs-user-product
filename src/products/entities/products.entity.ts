import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
@Entity()
export class Product {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ nullable: false })
  name: string;

  @Field()
  @Column('decimal', { nullable: false })
  price: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.orders)
  user: User;
}
