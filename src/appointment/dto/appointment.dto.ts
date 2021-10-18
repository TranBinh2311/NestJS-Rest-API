import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CreateAppointmentDto } from './create-appointment.dto';


export class getApptsDTO extends PartialType(CreateAppointmentDto) {
  
}
