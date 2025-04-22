import { IsArray, IsString, ArrayNotEmpty, MaxLength, IsUUID, IsOptional } from 'class-validator';
import { Location } from '../entities/location.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Manager } from 'src/managers/entities/manager.entity';
export class CreateLocationDto extends Location {
    @ApiProperty({
        example:"Mesopotamia"
    })
    @IsString()
    @MaxLength(35)
    locationName: string;
    @ApiProperty({
        example:"Av. 5 de Febrero 123"
    })
    @IsString()
    @MaxLength(120)
    locationAddress: string;
    @ApiProperty({
        example:[518, 9800]
    })
    @IsArray()
    @ArrayNotEmpty()
    locationLatLng: number[];

    @IsUUID()
    @IsOptional()
    @ApiProperty({
        example: "d290f1ee-6c54-4b01-90e6-d701748f0851"
    })
    @IsUUID()
    @IsOptional()
    manager: Manager;
}