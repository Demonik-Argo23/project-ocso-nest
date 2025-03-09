import { IsArray, IsString, ArrayNotEmpty, MaxLength } from 'class-validator';
import { Location } from '../entities/location.entity';
export class CreateLocationDto extends Location {
    @IsString()
    @MaxLength(35)
    locationName: string;
    @IsString()
    @MaxLength(120)
    locationAddress: string;
    @IsArray()
    @ArrayNotEmpty()
    locationLatLng: number[];

}