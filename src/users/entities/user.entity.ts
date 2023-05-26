import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Product } from 'src/products/entities/products.entity';
import {
  AfterLoad,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class User {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ nullable: false })
  name: string;

  @Field()
  @Column({ nullable: false })
  email: string;

  @Field(() => Int)
  @Column('int', { nullable: false })
  age: number;

  @Field(() => [Product])
  @OneToMany(() => Product, (product) => product.user, { cascade: true })
  orders: Product[];

  @AfterLoad()
  async nullChecks() {
    if (!this.orders) {
      this.orders = [];
    }
  }
}
