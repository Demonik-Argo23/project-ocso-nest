import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @Post("signup")
    signup(@Body()creatUserDto: CreateUserDto) {
        return this.authService.registerUser(creatUserDto);
    }
    @Post("login")
    login(@Body() loginUserDto : LoginUserDto ) {
        return  this.authService.loginUser(loginUserDto);
    } 
}