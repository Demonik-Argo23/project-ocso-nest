import {IsString, IsUUID, IsOptional, MaxLength, IsNumber, IsInt} from "class-validator";


export class CreateProductDto {
    @IsString()
    @IsUUID('4')
    @IsOptional()
    productId: string;
    @IsString()
    @MaxLength(40)
    productName: string;
    @IsNumber()
    price: number;
    @IsInt()
    countSeal: number;
    @IsString()
    @IsUUID()
    @IsOptional()
    provider: string;
}