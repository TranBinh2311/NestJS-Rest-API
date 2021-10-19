import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, BadRequestException, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppointmentService } from './appointment.service';
import { getApptsDTO } from './dto/appointment.dto';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Controller('appointment')
@ApiTags('appointment')
export class AppointmentController {
    constructor(private readonly appointmentService: AppointmentService) { }

    @Get('getById/:id')
    @ApiResponse({
        status: 200,
        description: 'Get Appointment By Id'
    })
    async findOneApp(@Param('id', ParseIntPipe) id: number) {
        const appt = await this.appointmentService.appointment(id);
        return appt;
    }

    @Post('listAppByUser')
    @ApiResponse({
        status: 200,
        description: 'get list App Follow User'
    })
    async findApptsByUser(@Body() filter: getApptsDTO) {
        const appts = await this.appointmentService.appointmentsByUser(filter);
        return appts;
    }

    @Post('createApp')
    @ApiResponse({
        status: 201,
        description: 'Create Appointment'
    })
    async createOneApp(@Body() input: CreateAppointmentDto) {
        //console.log(typeof input.validate);    
        // const errors = input.validate;
        // if (errors.length > 0) {
        //     throw new BadRequestException(errors)
        // }
        
        const {
            toUser,
            startTime,
            endTime,
            timeZone
        } = input

        const newAppt = await this.appointmentService.createApp({
            toUser,
            startTime,
            endTime,
            timeZone
        });
        return newAppt;
    }

    @Patch('updateAppt/:id')
    @ApiResponse({
        status: 200,
        description: 'Update Appointment'
    })
    async updateOneAppt(@Param('id', ParseIntPipe) id: number, @Body() input: UpdateAppointmentDto) {
        const apptUpdated = await this.appointmentService.updateApp(id, input);
        return apptUpdated;
    }

    @Delete('deleteUser/:id')
    @ApiResponse({
        status: 204,
        description: 'Delete Appointment'
    })
    async deleteOneAppt(@Param('id', ParseIntPipe) id: number) {
        const apptDeleted = await this.appointmentService.deleteApp(id);
        return apptDeleted;
    }
}
