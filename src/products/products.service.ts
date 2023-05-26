import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from './entities/products.entity';
import { CreateProductInput } from './dto/create-product.input';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async findOne(id: string): Promise<Product> {
    return await this.productRepository.findOneByOrFail({
      id,
    });
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async create(createProductInput: CreateProductInput): Promise<Product> {
    return await this.productRepository.save(createProductInput);
  }
}
