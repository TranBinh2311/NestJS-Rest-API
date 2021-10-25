import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, BadRequestException, Query, UsePipes } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Validate } from 'class-validator';
import { AppointmentService } from './appointment.service';
import { getApptsDTO } from './dto/appointment.dto';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { checkValid } from './valid/appointment.entity';
import { ValidationPipe } from 'src/shared/validation.pip';
import { PrismaService } from 'src/prisma/prisma.service';
@Controller('appointment')
@ApiTags('appointment')
export class AppointmentController {
    constructor(private readonly appointmentService: AppointmentService) { }
/*------------------------------------------GET APPOIMENT BY ID----------------------------------------------------------------------*/
    @Get('getById/:id')
    @ApiResponse({
        status: 200,
        description: 'Get Appointment By Id'
    })
    async findOneApp(@Param('id', ParseIntPipe) id: number) {
        const appt = await this.appointmentService.appointment(id);
        return appt;
    }
/*------------------------------------------GET LIST APPOINTMENT BY USER AND {START DATE, END DATE}----------------------------------------------------------------------*/
    @Post('listAppByUser')
    @ApiResponse({
        status: 200,
        description: 'get list App Follow User'
    })
    async findApptsByUser(@Body(new ValidationPipe) filter: getApptsDTO) {

        //checkValid.validate(filter);

        const appts = await this.appointmentService.appointmentsByUser(filter);
        return appts;
    }

/*------------------------------------------CREATE APPOIMENT FOR USER----------------------------------------------------------------------*/
    @Post('createApp')
    @ApiResponse({ 
        status: 201,
        description: 'Create Appointment'
    })
    async createOneApp(@Body(new ValidationPipe) input: CreateAppointmentDto) { // check invalide input

        checkValid.validate(input); // check starttime and endtime (ex: starttime must be smaller than endtime ) 

        const {
            toUser,
            startTime,
            endTime,
            timeZone
        } = input  // destructuring

        const newAppt = await this.appointmentService.createApp({
            toUser,
            startTime,
            endTime,
            timeZone
        });
        return newAppt;
    }
/*------------------------------------------UPDATE APPOINTMENT----------------------------------------------------------------------*/
    @Patch('updateAppt/:id')
    @ApiResponse({
        status: 200,
        description: 'Update Appointment'
    })
    async updateOneAppt(@Param('id', ParseIntPipe) id: number, @Body(new ValidationPipe) input: UpdateAppointmentDto) {
        const apptUpdated = await this.appointmentService.updateApp(id, input);
        return apptUpdated;
    }
/*------------------------------------------DELETE APPOINMENT----------------------------------------------------------------------*/
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
