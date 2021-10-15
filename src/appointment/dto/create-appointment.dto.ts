import { IsNotEmpty, IsString } from "class-validator";

export class CreateAppointmentDto {
    @IsString()
    @IsNotEmpty()
    readonly toUser: string;

    @IsString()
    @IsNotEmpty()
    readonly startTime: string;

    @IsString()
    @IsNotEmpty()
    readonly endTime: string;

}
