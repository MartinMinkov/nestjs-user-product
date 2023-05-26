import { InputType, Field } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class AddOrderInput {
  @Field({ description: 'Id of the user' })
  @IsUUID()
  userId: string;

  @Field({ description: 'Id of the product' })
  @IsUUID()
  productId: string;
}
