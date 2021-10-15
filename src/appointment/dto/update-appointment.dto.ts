import { PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CreateAppointmentDto } from './create-appointment.dto';

export class UpdateAppointmentDto extends PartialType(CreateAppointmentDto) {
    @IsString()
    id: string;

    @IsString()
    startTime: string;

    @IsString()
    endTime: string;
}
