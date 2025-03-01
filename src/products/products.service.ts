import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ProductsService {
  private products: CreateProductDto[] = [
    {
      productId: uuid(),
      productName: "Sabritas Normal",
      price: 29,
      countSeal: 3,
      provider: uuid(),
    },
    {
      productId: uuid(),
      productName: "Coca Cola 600ml",
      price: 40,
      countSeal: 2,
      provider: uuid(),
    },
    {
      productId: uuid(),
      productName: "Agua Ciel 1L",
      price: 15,
      countSeal: 2,
      provider: uuid(),
    }
  ]
  create(createProductDto: CreateProductDto) {
    createProductDto.productId = uuid();
    this.products.push(createProductDto);
    return createProductDto;
  }

  findAll() {
    return this.products;
  }

  findOne(id: string) {
    const productFound = this.products.filter((product) => product.productId === id) [0];
        if (!productFound) throw new NotFoundException();
        return productFound;
  }

  findByProvider(id:string){
    const productsFound = this.products.filter((product) => product.provider === id);
    if (productsFound.length === 0) throw new NotFoundException();
    return productsFound;
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    let productToUpdate = this.findOne(id)
    productToUpdate = {
      ...productToUpdate,
      ...updateProductDto,
    }
    this.products = this.products.map((product) => {
      if (product.productId === id) {
        product = productToUpdate
      }
      return product
    })
    return productToUpdate;
  }

  remove(id: string) {
    const { productId } = this.findOne(id);
    this.products = this.products.filter((product) => product.productId !== id);
    return this.products;  
  }
}
