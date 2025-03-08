import {IsString, IsUUID, IsOptional, MaxLength, IsNumber, IsInt} from "class-validator";
import { Product } from "../entities/product.entity";
import { Provider } from 'src/providers/entities/provider.entity'


export class CreateProductDto extends Product{
    @IsString()
    @IsUUID('4')
    @IsOptional()
    productId: string;
    @IsString()
    @MaxLength(40)
    productName: string;
    @IsNumber()
    price= 0;
    @IsInt()
    countSeal: number;
    @IsString()
    @IsUUID()
    @IsOptional()
    provider: Provider;
}