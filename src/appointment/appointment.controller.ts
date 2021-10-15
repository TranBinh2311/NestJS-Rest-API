import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppointmentService } from './appointment.service';
import { getApptsDTO } from './dto/appointment.dto';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Controller('appointment')
@ApiTags('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Get()
    async findAllAppts() {
        const appts = await this.appointmentService.appointments();
        return appts;
    }

    @Get(':id')
    async findOneAppt(@Param('id') id: string) {
        const appt = await this.appointmentService.appointment(id);
        return appt;
    }

    @Post('apptsByUser')
    async findApptsByUser(@Body() filter: getApptsDTO) {
        const appts = await this.appointmentService.appointmentsByUser(filter);
        return appts;
    }

    @Post('createAppt')
    async createOneAppt(@Body() input: CreateAppointmentDto) {
        const newAppt = await this.appointmentService.createAppt(input);
        return newAppt;
    }

    @Patch('updateAppt/:id')
    async updateOneAppt(@Param('id') id: string, @Body() input: UpdateAppointmentDto) {
        const apptUpdated = await this.appointmentService.updateAppt(id, input);
        return apptUpdated;
    }

    @Delete('deleteUser/:id')
    async deleteOneAppt(@Param('id') id: string) {
        const apptDeleted = await this.appointmentService.deleteAppt(id);
        return apptDeleted;
    }
}
