import { IsEmail, IsNumber, IsString, MaxLength } from "class-validator";
import { Manager } from "../entities/manager.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreateManagerDto extends Manager{
    @ApiProperty({
        example:"Maximiliano de Habsburgo"
    })
    @IsString()
    @MaxLength(80)
    managerFullName: string;
    @ApiProperty({
        example:"habsMax@conquer.com"
    })
    @IsString()
    @IsEmail()
    managerEmail: string;
    @ApiProperty({
        example: 10000000000000
    })
    @IsNumber()
    managerSalary: number;
    @ApiProperty({
        example:"911"
    })
    @IsString()
    @MaxLength(16)
    managerPhoneNumber: string;
}