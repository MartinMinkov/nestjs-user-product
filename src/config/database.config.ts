import { registerAs } from '@nestjs/config';

export const databaseConfig = registerAs('database', () => ({
  type: process.env.DATABASE_TYPE,
  database: process.env.DATABASE_DB,
  synchronize: true,
  dropSchema: true,
  logging: true,
  entities: ['dist/**/*.entity{.ts,.js}'],
}));
