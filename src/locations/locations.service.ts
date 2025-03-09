import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Location } from './entities/location.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';




@Injectable()
export class LocationsService {
constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
) {}
create(createLocationDto: CreateLocationDto) {
    return this.locationRepository.save(createLocationDto);
}

findAll() {
    return this.locationRepository.find();
}

findOne(id: number) {
    const location = this.locationRepository.findOneBy({
    locationId: id,
    });
    return location;
}

async update(id: number, updateLocationDto: UpdateLocationDto) {
    const locationToUpdate = await this.locationRepository.preload({
    locationId: id,
    ...updateLocationDto,
    });
    if (!locationToUpdate) throw new NotFoundException();
    this.locationRepository.save(locationToUpdate);
    return locationToUpdate;
}

remove(id: number) {
    return this.locationRepository.delete({
    locationId: id,
    });
    return {
    message: 'Location deleted',
    };
}
}