import { Manager } from "../../managers/entities/manager.entity";
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    JoinColumn,
    OneToOne,
    ManyToOne,
    OneToMany,
} from "typeorm";
import { Region } from "../../regions/entities/region.entity";
import { Employee } from "../../employees/entities/employee.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Location {
    @PrimaryGeneratedColumn("increment")
    locationId: number;
    @ApiProperty({
        default: "OCSO Juriquilla",
    })
    @Column("text")
    locationName: string;
    @ApiProperty({
        default: "Avenida Tal, S/N, 76220",
    })
    @Column("text")
    locationAddress: string;
    @ApiProperty({
        default: [12, 12],
    })
    @Column("simple-array")
    locationLatLng: number[];
    @OneToOne(() => Manager, {
        eager: true,
    })
    @JoinColumn({
        name: "managerId",
    })
    manager: Manager;
    @ManyToOne(() => Region, (region) => region.locations)
    @JoinColumn({
        name: "regionId",
    })
    region: Region;
    @OneToMany(() => Employee, (employee) => employee.location)
    employees: Employee[];
}
