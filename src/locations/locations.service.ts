import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateLocationDto } from "./dto/create-location.dto";
import { UpdateLocationDto } from "./dto/update-location.dto";
import { Location } from "./entities/location.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Manager } from "src/managers/entities/manager.entity";

@Injectable()
export class LocationsService {
    constructor(
        @InjectRepository(Location)
        private locationRepository: Repository<Location>,
        @InjectRepository(Manager)
        private managerRepository: Repository<Manager>
    ) { }

    async create(createLocationDto: CreateLocationDto) {
        const manager = createLocationDto.manager
            ? await this.managerRepository.findOneBy({ managerId: createLocationDto.manager as unknown as string })
            : undefined;

        const location = this.locationRepository.create({
            ...createLocationDto,
            manager: manager || undefined,
        });
        return this.locationRepository.save(location);
    }

    findAll() {
        return this.locationRepository.find();
    }

    async findOne(id: number) {
        const location = await this.locationRepository.findOneBy({
            locationId: id,
        });
        if (!location) {
            throw new NotFoundException(`Location with id ${id} not found`);
        }
        return location;
    }

    async update(id: number, updateLocationDto: UpdateLocationDto) {
        await this.managerRepository
            .createQueryBuilder()
            .update()
            .set({ location: null as any })
            .where("locationId = :id", { id })
            .execute();

        const manager = updateLocationDto.manager
            ? await this.managerRepository.findOneBy({ managerId: updateLocationDto.manager as unknown as string })
            : undefined;

        const location = await this.locationRepository.preload({
            locationId: id,
            ...updateLocationDto,
            manager: manager ?? undefined,
        });
        if (!location) {
            throw new NotFoundException();
        }
        const savedLocation = await this.locationRepository.save(location);

        const updatedManager = await this.managerRepository.preload({
            managerId: updateLocationDto.manager?.managerId,
            location: location,
        });
        if (!updatedManager) {
            throw new NotFoundException();
        }
        await this.managerRepository.save(updatedManager);
        return savedLocation;
    }

    async remove(id: number) {
        const result = await this.locationRepository.delete({
            locationId: id,
        });
        if (result.affected === 0) {
            throw new NotFoundException(`Location with id ${id} not found`);
        }
        return { message: "Location deleted" };
    }
}