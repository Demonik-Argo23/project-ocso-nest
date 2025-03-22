import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Put } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Res } from '@nestjs/common';
import { TOKEN_NAME } from './constants/jwt.constants';
import { Cookies } from './decorators/cookies.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @Post("signup")
    signup(@Body()creatUserDto: CreateUserDto) {
        return this.authService.registerUser(creatUserDto);
    }
    @Post("login")
    async login(@Body() loginUserDto : LoginUserDto, @Res({passthrough: true}) response: Response, @Cookies() cookies: any ) {
        const token =  await this.authService.loginUser(loginUserDto);
        response.cookie(TOKEN_NAME, token, {
            httpOnly: false,
            secure: true,
            sameSite: 'none',
            maxAge: 1000 * 60 * 60 * 24 * 7,
        });
        return;
    } 
    @Patch("/:email")
    updateUser(@Param ("email") userEmail: string, @Body() updateUserDto: UpdateUserDto) {
        return this.authService.updateUser(userEmail, updateUserDto);
    }
}