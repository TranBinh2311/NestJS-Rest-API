import { Appointment } from '.prisma/client';
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';
import { getApptsDTO } from './dto/appointment.dto';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

import {
    UserException,
    ApptException,
} from '../exceptions/exception';
import { PrismaError } from '../utils/prismaError';
import { emit } from 'process';
import { NotFoundError } from 'rxjs';

@Injectable()
export class AppointmentService {

    constructor(private prisma: PrismaService) { }

    // Get a single appointment by email user
    async appointment(id: number): Promise<Appointment> {

        // get in4 appoint by user.id
        const app = await this.prisma.appointment.findUnique({
            where: { id }
        });

        return app;
    }

    // Get multiple posts


    //get list appointment by user
    async appointmentsByUser(filter: getApptsDTO): Promise<Appointment[]> {
        const today = new Date();
        const startDate = new Date(Date.parse(filter.startTime));
        const endDate = new Date(Date.parse(filter.endTime));

        const appointments = await this.prisma.appointment.findMany({
            where: {
                AND: [
                    { userId: filter.toUser },
                    {
                        startTime: {
                            gte: startDate,
                        },
                    },
                    {
                        endTime: {
                            lte: endDate,
                        },
                    },
                ],
            }
        });
        return appointments;
    }
    // Create an appointment
    async createApp({
        toUser,
        startTime,
        endTime,
        timeZone
    }): Promise<Appointment> {

        const newApp = await this.prisma.appointment.create({
            data: {
                startTime,
                endTime,
                timeZone,
                toUser: {
                    connect: {
                        id: toUser,
                    },
                },
            }
        });
        return newApp;
    }

    // Update an appointment
    async updateApp(id: number, params: UpdateAppointmentDto): Promise<Appointment> {
        const { startTime, endTime } = params;
        const today = new Date();

        // if (Date.parse(startTime) < today.valueOf()) {
        //     throw new HttpException(
        //         'Start date must be greater than today',
        //         HttpStatus.BAD_REQUEST,
        //     );
        // }

        // if (Date.parse(startTime) > Date.parse(endTime)) {
        //     throw new HttpException(
        //         'End date must be greater than start date',
        //         HttpStatus.BAD_REQUEST,
        //     );
        // }

        try {
            const updateAppt = await this.prisma.appointment.update({
                where: { id },
                data: {
                    ...(startTime && { startTime }),
                    ...(endTime && { endTime }),
                },
                include: {
                    toUser: true, // Return all fields
                },
            });

            return updateAppt;
        } catch (error) {
            if (
                error instanceof PrismaClientKnownRequestError &&
                error.code === PrismaError.RecordDoesNotExist
            ) {
                throw new ApptException(id);
            }
            throw error;
        }
    }

    // delete an appointment
    async deleteApp(id: number): Promise<Appointment> {
        try {
            const deleteAppt = await this.prisma.appointment.delete({
                where: { id },
            });
            return deleteAppt;
        } catch (error) {
            if (
                error instanceof PrismaClientKnownRequestError &&
                error.code === PrismaError.RecordDoesNotExist
            ) {
                throw new NotFoundException(`Not found ${id}`)
            }
            throw error;
        }
    }
}
