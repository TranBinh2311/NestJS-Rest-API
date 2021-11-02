import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { createUserDTO } from './dto/createUser.dto';
import { updateUserDTO } from './dto/updateUser.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaError } from '../utils/prismaError';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    // Create a new
    async createUser(input: createUserDTO): Promise<User> {
        const user = await this.prisma.user.findUnique({
            where: {
                email: input.email,
            },
        });

        if (user)
            throw new HttpException(
                'User is already exist',
                HttpStatus.BAD_REQUEST,
            );

        const newUser = await this.prisma.user.create({
            data: input,
            include: {
                appointments: true,
            },
        });
        return newUser;
    }

    // Get a single user
    async user(id: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: {
                id: parseInt(id),
            },
            include: {
                appointments: true,
            },
        });

        if (!user) throw new NotFoundException()

        return user;
    }

    // Get multiple users
    async users(): Promise<User[] | null> {
        return this.prisma.user.findMany({
            include: {
                appointments: true,
            },
        });
    }

    // Update a user
    async updateUser(params: updateUserDTO): Promise<User> {
        const { id, firstName, lastName, birthdate, role } = params;

        try {
            const updateUser = await this.prisma.user.update({
                where: {
                    id: parseInt(id),
                },
                data: {
                    ...(firstName && { first_name }),
                    ...(last_name && { last_name }),
                    ...(birthdate && { birthdate }),
                    ...(role && { role }),
                },
                include: {
                    appointments: true, // Return all fields
                },
            });

            return updateUser;
        } catch (error) {
            if (
                error instanceof PrismaClientKnownRequestError &&
                error.code === PrismaError.RecordDoesNotExist
            ) {
                throw new NotFoundException()
            }
            throw error;
        }
    }

    // delete an user
    async deleteUser(id: number): Promise<User> {
        const user = await this.prisma.user.findUnique({
            where: {
                id
            },
            include: {
                appointments: true,
            },
        });

        if (!user) throw new NotFoundException()

        const deleteUser = this.prisma.user.delete({
            where: {
                id
            },
        });

        const deleteAppts = this.prisma.appointment.deleteMany({
            where: {
                userId: id,
            },
        });

        await this.prisma.$transaction([deleteAppts, deleteUser]);

        return user;
    }
}
