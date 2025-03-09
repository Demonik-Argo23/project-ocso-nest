import { IsEmail, IsOptional, IsString, MinLength, IsIn } from "class-validator";
import { User } from "../entities/user.entity";

export class CreateUserDto extends User {
    @IsEmail() 
    userEmail: string;
    @IsString()
    @MinLength(8)
    userPassword: string;
    @IsOptional()
    @IsIn(["Employee", "Manager", "Admin"])
    userRoles: string[];
}