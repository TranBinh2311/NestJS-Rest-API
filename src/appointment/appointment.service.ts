import { Appointment } from '.prisma/client';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

@Injectable()
export class AppointmentService {

  constructor(private prisma: PrismaService){}

  // Get a single appointment by email user
  async appointment(email: string): Promise<Appointment | null> {

    //const today = new Date();
    // get in4 User by email
    const userExist = await this.prisma.user.findUnique({
        where: {
            email: email,
        },
    });

    if (!userExist) 
    {
        throw new HttpException(
            'Not found user',
            HttpStatus.BAD_REQUEST,
        );
    }
    // get in4 appoint by user.id
    const app = await this.prisma.appointment.findUnique({
        where: {
            id: userExist.id,
        },
        include: {
            toUser: true, // Return all fields
        },
    });

    if (!app) throw new HttpException(
      'Appointment not found',
      HttpStatus.BAD_REQUEST,
    )

    return app;
}

// Get multiple posts
async appointments(): Promise<Appointment[]> {
    const appointments = await this.prisma.appointment.findMany({
        include: {
            toUser: true, // Return all fields
        },
    });
    return appointments;
}

//get list appointment by user
    async appointmentsByUser(filter: getApptsDTO): Promise<Appointment[]> {
        const today = new Date();
        const userExist = await this.prisma.user.findUnique({
            where: {
                email: filter.toUser,
            },
        });

        if (!userExist) 
        {
            throw new HttpException(
                'User not found',
                HttpStatus.BAD_REQUEST,
            );
        }

        const startDate = new Date(Date.parse(filter.startTime));
        const endDate = new Date(Date.parse(filter.endTime));

        if (Date.parse(filter.startTime) < today.valueOf()) {
            throw new HttpException(
                'Start date must be greater than today',
                HttpStatus.BAD_REQUEST,
            );
        }

        if (Date.parse(filter.startTime) > Date.parse(filter.endTime)) {
            throw new HttpException(
                'End date must be greater than start date',
                HttpStatus.BAD_REQUEST,
            );
        }

        const appointments = await this.prisma.appointment.findMany({
            where: {
                AND: [
                    { userId: userExist.id },
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
            },
            include: {
                toUser: true, // Return all fields
            },
        });
        return appointments;
    }
// Create an appointment
async createApp(input: CreateAppointmentDto): Promise<Appointment> {
    const today = new Date();
    const userExist = await this.prisma.user.findUnique({
        where: {
            email : input.toUser,
        },
    });

    if (!userExist) 
    {
        throw new HttpException(
          'User not found',
          HttpStatus.BAD_REQUEST,
        );
    }

    if (Date.parse(input.startTime) < today.valueOf()) {
        throw new HttpException(
            'Start date must be greater than today',
            HttpStatus.BAD_REQUEST,
        );
    }

    if (Date.parse(input.startTime) > Date.parse(input.endTime)) {
        throw new HttpException(
            'End date must be greater than start date',
            HttpStatus.BAD_REQUEST,
        );
    }

    const newAppt = await this.prisma.appointment.create({
        data: {
            ...input,
            toUser: {
                connect: {
                    email: userExist.email,
                },
            },
        },
        include: {
            toUser: true, // Return all fields
        },
    });
    return newAppt;
}

// Update an appointment
async updateApp(id: string, params: UpdateAppointmentDto): Promise<Appointment> {
    const { startTime, endTime } = params;
    const today = new Date();

    if (Date.parse(startTime) < today.valueOf()) {
        throw new HttpException(
            'Start date must be greater than today',
            HttpStatus.BAD_REQUEST,
        );
    }

    if (Date.parse(startTime) > Date.parse(endTime)) {
        throw new HttpException(
            'End date must be greater than start date',
            HttpStatus.BAD_REQUEST,
        );
    }

    try {
        const updateAppt = await this.prisma.appointment.update({
            where: {
                id: parseInt(id),
            },
            data : {
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
            throw new ApptException(parseInt(id));
        }
        throw error;
    }
}

// delete an appointment
async deleteApp(id: string): Promise<Appointment> {
    try {
        const deleteAppt = await this.prisma.appointment.delete({
            where: {
                id: parseInt(id),
            },
            include: {
                toUser: true, // Return all fields
            },
        });
        return deleteAppt;
    } catch (error) {
        if (
            error instanceof PrismaClientKnownRequestError &&
            error.code === PrismaError.RecordDoesNotExist
        ) {
            throw new ApptException(parseInt(id));
        }
        throw error;
    }
}
}
