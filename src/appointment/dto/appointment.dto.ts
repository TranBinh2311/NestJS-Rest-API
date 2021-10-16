import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class getApptsDTO {
    @ApiProperty()
    @IsString()
    toUser: string;

    @ApiProperty()
    @IsString()
    startTime: string;

    @ApiProperty()
    @IsString()
    endTime: string;
}