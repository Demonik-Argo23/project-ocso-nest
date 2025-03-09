import { Module } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationsController } from './locations.controller';
import { Location } from './entities/location.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Location])],
    controllers: [LocationsController],
    providers: [LocationsService],
})
export class LocationsModule {}