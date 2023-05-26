import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { AddOrderInput } from './dto/add-order.input';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private productService: ProductsService,
  ) {}

  async findOne(id: string): Promise<User> {
    return await this.userRepository.findOneOrFail({
      where: { id },
      relations: ['orders'],
    });
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({ relations: ['orders'] });
  }

  async create(createUserInput: CreateUserInput): Promise<User> {
    const user = await this.userRepository.create(createUserInput);
    user.orders = [];
    return await this.userRepository.save(user);
  }

  async addOrder(addOrderInput: AddOrderInput): Promise<User> {
    const user = await this.findOne(addOrderInput.userId);
    const product = await this.productService.findOne(addOrderInput.productId);

    if (user.orders.find((order) => order.id === product.id)) {
      throw new Error(
        `Product ${product.id} already exists in user #${user.id} orders`,
      );
    }

    user.orders.push(product);
    return await this.userRepository.save(user);
  }
}
