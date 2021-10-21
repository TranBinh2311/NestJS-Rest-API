import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { error } from "console";
import { checkValid } from '../valid/appointment.entity'

export class CreateAppointmentDto extends checkValid  {


    

    @ApiProperty()
    @IsNotEmpty()
    readonly toUser: number;

    @ApiProperty({
        description: 'Input must have date format ',
        example: '1999-11-23T00:00:00.000Z'
    })
    @IsString()
    @IsNotEmpty()
    readonly startTime: string;

    @ApiProperty({
        description: 'Input must have date format ',
        example: '1999-11-23T00:00:00.000Z'
    })
    @IsString()
    @IsNotEmpty()
    readonly endTime: string;

    @ApiProperty({
        description: 'IANA time zone string ',
        example: 'Europe/London'
    })
    @IsString()
    @IsNotEmpty()
    readonly timeZone: string;

}
