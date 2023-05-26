import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEmail, IsInt, IsNotEmpty, IsPositive } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field({ description: 'Name of the user' })
  @IsNotEmpty()
  name: string;

  @Field({ description: 'Email of the user' })
  @IsEmail()
  email: string;

  @Field(() => Int, { description: 'Age of the user' })
  @IsInt()
  @IsPositive()
  age: number;
}
