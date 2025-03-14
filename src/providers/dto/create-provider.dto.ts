import { ApiProperty, ApiResponseProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString, Max, MaxLength } from "class-validator";
export class CreateProviderDto {
    @ApiProperty({
        example: "FUD"
    })
    @IsString()
    @MaxLength(100)
    providerName: string;
    @ApiProperty({
        example: "fudcontatus@meat.com"
    })
    @IsEmail()
    @IsString()
    providerEmail: string;
    @ApiProperty({
        example:"7892521463"
    })
    @IsString()
    @MaxLength(15)
    @IsOptional()
    providerPhoneNumber: string;
}