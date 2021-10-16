import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateAppointmentDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly toUser: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly startTime: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly endTime: string;

}
