import { IsEmail, IsOptional, IsString, MinLength, IsIn } from "class-validator";
import { User } from "../entities/user.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto extends User {
    @ApiProperty({
        default: "user@gmail.com"
    })
    @IsEmail() 
    userEmail: string;
    @ApiProperty({
        default: "password"
    })
    @IsString()
    @MinLength(8)
    userPassword: string;
    @ApiProperty({
        default: "Employee"
    })
    @IsOptional()
    @IsIn(["Employee", "Manager", "Admin"])
    userRoles: string[];
}