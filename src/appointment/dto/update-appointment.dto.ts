import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CreateAppointmentDto } from './create-appointment.dto';

export class UpdateAppointmentDto extends PartialType(CreateAppointmentDto) {
    @ApiProperty()
    @IsString()
    id: string;

    @ApiProperty()
    @IsString()
    startTime: string;

    @ApiProperty()
    @IsString()
    endTime: string;
}
