import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";

export class LoginUserDto {
    @ApiProperty({
        default: "chocobo@gmail.com"
    }) 
    @IsString()
    @IsEmail()
    userEmail: string;
    @ApiProperty({
        default: "password"
    })
    @IsString()
    @MinLength(8)
    userPassword: string;
}