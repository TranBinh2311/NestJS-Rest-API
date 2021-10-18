import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { checkValid } from './valid/appointment.entity';

@Module({
  controllers: [AppointmentController],
  providers: [AppointmentService]
})
export class AppointmentModule {}
