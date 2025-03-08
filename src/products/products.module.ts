import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([ProductsModule])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}