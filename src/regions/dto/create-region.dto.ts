import { IsArray, IsString, MaxLength } from "class-validator";
import { Region } from "../entities/region.entity";
import { ApiProperty } from "@nestjs/swagger";

    
export class CreateRegionDto extends Region {
    @ApiProperty({
        example:"Centro"
    })
    @IsString()
    @MaxLength(100)
    regionName: string;
    @ApiProperty({
        example:["CDMX", "Hidalgo"]
    })
    @IsArray()
    regionStates: string[];
}