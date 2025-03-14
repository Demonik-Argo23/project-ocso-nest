import { IsEmail, IsObject, IsOptional, IsString, MaxLength } from "class-validator";
import { Employee } from "../entities/employee.entity";
import { Location } from "src/locations/entities/location.entity";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateEmployeeDto extends Employee{
    @ApiProperty()
    @IsString()
    @MaxLength(30)
    employeeName: string;
    @ApiProperty()
    @IsString()
    @MaxLength(40)
    employeeLastName: string;
    @ApiProperty()
    @IsString()
    @MaxLength(10)
    phoneNumber: string;
    @ApiProperty()
    @IsString()
    @IsEmail()
    employeeEmail: string;  
    @ApiProperty()
    @IsOptional()
    @IsObject()
    location: Location;
}

