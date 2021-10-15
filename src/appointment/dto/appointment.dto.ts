import { IsString } from 'class-validator';

export class getApptsDTO {
    @IsString()
    toUser: string;

    @IsString()
    startTime: string;

    @IsString()
    endTime: string;
}