import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UseGuards } from '@nestjs/common';
import { UserData } from 'src/auth/decorators/user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { UnauthorizedException } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ROLES } from 'src/auth/constants/roles.constants';


@UseGuards(AuthGuard)
@Controller('providers')
export class ProvidersController {
    constructor(private readonly providersService: ProvidersService) {}

    @Auth(ROLES.MANAGER)
    @Post()
    create(@Body() createProviderDto: CreateProviderDto) {
        return this.providersService.create(createProviderDto);
    }

    @Auth(ROLES.EMPLOYEE, ROLES.MANAGER)
    @Get()
    findAll(@UserData() user: User) {
    if (user.userRoles.includes('Employee'))throw new UnauthorizedException('No estas autorizado, solo admins y managers');
        return this.providersService.findAll();
    }
    @Auth(ROLES.EMPLOYEE, ROLES.MANAGER)
    @Get(':name')
    findByName(@Param('name') name: string) {
        return this.providersService.findOneByName(name);
    }

    @Auth(ROLES.EMPLOYEE, ROLES.MANAGER)
    @Get(':id')
    findOne(@Param('id') id: string) {
    const provider = this.providersService.findOne(id);
    if(!provider) throw new NotFoundException();
        return provider;
    }

    @Auth(ROLES.MANAGER)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateProviderDto: UpdateProviderDto) {
        return this.providersService.update(id, updateProviderDto);
    }

    @Auth(ROLES.MANAGER)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.providersService.remove(id);
    }
}