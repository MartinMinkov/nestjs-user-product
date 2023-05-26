import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsPositive } from 'class-validator';

@InputType()
export class CreateProductInput {
  @Field({ description: 'The name of the product' })
  @IsNotEmpty()
  name: string;

  @Field({ description: 'The price of the product' })
  @IsPositive()
  price: number;
}
