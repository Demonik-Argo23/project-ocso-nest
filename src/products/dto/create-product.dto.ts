import {IsString, IsUUID, IsOptional, MaxLength, IsNumber, IsInt} from "class-validator";
import { Product } from "../entities/product.entity";
import { Provider } from 'src/providers/entities/provider.entity'
import { ApiProperty } from "@nestjs/swagger";


export class CreateProductDto extends Product{
    @ApiProperty({
        example: "UUID"
    })
    @IsString()
    @IsUUID('4')
    @IsOptional()
    productId: string;
    @ApiProperty({
        example:"Salchicha FUD"
    })
    @IsString()
    @MaxLength(40)
    productName: string;
    @ApiProperty({
        example: 75
    })
    @IsNumber()
    price= 0;
    @ApiProperty({
        example: 2
    })
    @IsInt()
    countSeal: number;
    @ApiProperty({
        example:"FUD"
    })
    @IsString()
    @IsUUID()
    @IsOptional()
    provider: Provider;
}