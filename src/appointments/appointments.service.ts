import { LoggerService } from './../logger/logger.service';
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { Appointment } from '@prisma/client';
import { createApptDTO } from './dto/createAppt.dto';
import { updateApptDTO } from './dto/updateAppt.dto';
import { getApptsDTO } from './dto/appts.dto';
import {
    UserNotFoundException,
    ApptNotFoundException,
} from '../exceptions/NotFound.exception';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaError } from '../utils/prismaError';

@Injectable()
export class AppointmentsService {
    constructor(private prisma: PrismaService) { }
    private readonly logger: LoggerService = new Logger(
        AppointmentsService.name,
    );

    // Get a single appointment
    async appointment(id: number): Promise<Appointment> {
        const appt = await this.prisma.appointment.findUnique({
            where: { id },
        });

        if (!appt) {
            this.logger.warn(
                'Tried to access an appointment that does not exist',
            );
            throw new ApptNotFoundException(id);
        }

        return appt;
    }

    //get list appointment by user
    async appointmentsByUser(filter: getApptsDTO): Promise<Appointment[]> {
        // const today = new Date();
        const userExist = await this.prisma.user.findUnique({
            where: {
                id: filter.user,
            },
        });

        if (!userExist) {
            this.logger.warn('Tried to access an user that does not exist');
            throw new UserNotFoundException(filter.user);
        }

        const startDate = new Date(Date.parse(filter.timeFrom));
        const endDate = new Date(Date.parse(filter.timeTo));

        return this.prisma.appointment.findMany({
            where: {
                AND: [
                    { userId: filter.user },
                    {
                        startDate: {
                            gte: startDate,
                            lte: endDate,
                        },
                    },
                ],
            },
        });
    }

    // Create an appointment
    async createAppt(input: createApptDTO): Promise<Appointment> {
        const today = new Date();
        const userExist = await this.prisma.user.findUnique({
            where: {
                id: input.user,
            },
        });

        if (!userExist) {
            this.logger.warn('Tried to access an user that does not exist');
            throw new UserNotFoundException(input.user);
        }

        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        return this.prisma.appointment.create({
            data: {
                name: input.name,
                startDate: input.startDate,
                endDate: input.endDate,
                timeZone,
                user: {
                    connect: {
                        id: userExist.id,
                    },
                },
            },
        });
    }

    // Update an appointment
    async updateAppt(id: number, params: updateApptDTO): Promise<Appointment> {

        const app = await this.prisma.appointment.findUnique({
            where: { id },
        });

        if (!app) {
            this.logger.warn('Tried to access a user that does not exist');
            throw new UserNotFoundException(id);
        }
        return await this.prisma.appointment.update({
            where: { id },
            data: { ...params },
        });
    }

    // delete an appointment
    async deleteAppt(id: number): Promise<Appointment> {
        const app = await this.prisma.appointment.findUnique({
            where: { id },
        });

        if (!app) {
            this.logger.warn('Tried to access a user that does not exist');
            throw new UserNotFoundException(id);
        }

        return this.prisma.appointment.delete({
            where: { id },
        });
    }
}
