import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
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
    constructor(private readonly authService: AuthService) { }

    @Post("register/employee/:id")
    registerEmployee(
        @Body() CreateUserDto: CreateUserDto,
        @Param("id") id: string
    ) {
        if (
            CreateUserDto.userRoles.includes("Admin") ||
            CreateUserDto.userRoles.includes("Manager")
        )
            throw new BadRequestException("Rol inválido")
        return this.authService.registerEmployee(id, CreateUserDto)
    }   

    @Post("register/manager")
    registerManager(
        @Body() CreateUserDto: CreateUserDto,
        @Param("id") id: string
    ) {
        if (
            CreateUserDto.userRoles.includes("Admin") ||
            CreateUserDto.userRoles.includes("Employee")
        )
            throw new BadRequestException("Rol inválido")
        return this.authService.registerManager(id, CreateUserDto)
    }

    @Post("login")
    async login(@Body() loginUserDto: LoginUserDto, @Res({ passthrough: true }) response: Response, @Cookies() cookies: any) {
        const token = await this.authService.loginUser(loginUserDto);
        let expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 7);
        response.cookie(TOKEN_NAME, token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            expires: expireDate,
            maxAge: 1000 * 60 * 60 * 24 * 7,
        });
        return;
    }
    @Patch("/:email")
    updateUser(@Param("email") userEmail: string, @Body() updateUserDto: UpdateUserDto) {
        return this.authService.updateUser(userEmail, updateUserDto);
    }
}