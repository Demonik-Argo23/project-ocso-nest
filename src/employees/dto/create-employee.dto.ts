import { IsEmail, IsObject, IsOptional, IsString, MaxLength } from "class-validator";
import { Employee } from "../entities/employee.entity";
import { Location } from "src/locations/entities/location.entity";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateEmployeeDto extends Employee{
    @ApiProperty({
        example:"Maximiliano"
    })
    @IsString()
    @MaxLength(30)
    employeeName: string;
    @ApiProperty({
        example:"de Habsburgo"
    })
    @IsString()
    @MaxLength(40)
    employeeLastName: string;
    @ApiProperty({
        example:"911"
    })
    @IsString()
    @MaxLength(10)
    phoneNumber: string;
    @ApiProperty({
        example:"habsMax@conquer.com"
    })
    @IsString()
    @IsEmail()
    employeeEmail: string;  
    @ApiProperty({
        example:"Resinto Secreto, México"
    })
    @IsOptional()
    @IsObject()
    location: Location;
}

