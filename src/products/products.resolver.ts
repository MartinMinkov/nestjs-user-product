import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';

import { Product } from './entities/products.entity';
import { ProductsService } from './products.service';
import { CreateProductInput } from './dto/create-product.input';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(
    @Inject(ProductsService) private productsService: ProductsService,
  ) {}

  @Query(() => Product)
  async product(@Args('id') id: string): Promise<Product> {
    return await this.productsService.findOne(id);
  }

  @Query(() => [Product])
  async products(): Promise<Product[]> {
    return await this.productsService.findAll();
  }

  @Mutation(() => Product)
  async createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ): Promise<Product> {
    return this.productsService.create(createProductInput);
  }
}
