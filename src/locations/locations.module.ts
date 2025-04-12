import { Module } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationsController } from './locations.controller';
import { Location } from './entities/location.entity';
import { ManagersModule } from 'src/managers/managers.module';
import { Manager } from 'src/managers/entities/manager.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Location, Manager]), ManagersModule],
    controllers: [LocationsController],
    providers: [LocationsService],
})
export class LocationsModule { }