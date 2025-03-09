import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";


Entity()
export class Region {
    @PrimaryGeneratedColumn()
    regionId: number;
    @Column({
        type: "text",
        unique: true
    })
    regionName: string;
    @Column('array')
    regionStates: string[];
}