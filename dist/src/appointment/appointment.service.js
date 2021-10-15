"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentService = void 0;
const common_1 = require("@nestjs/common");
const runtime_1 = require("@prisma/client/runtime");
const prisma_service_1 = require("../prisma/prisma.service");
const exception_1 = require("../exceptions/exception");
const prismaError_1 = require("../utils/prismaError");
let AppointmentService = class AppointmentService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async appointment(id) {
        const appt = await this.prisma.appointment.findUnique({
            where: {
                id: parseInt(id),
            },
            include: {
                toUser: true,
            },
        });
        if (!appt)
            throw new common_1.HttpException('Appointment not found', common_1.HttpStatus.BAD_REQUEST);
        return appt;
    }
    async appointments() {
        const appointments = await this.prisma.appointment.findMany({
            include: {
                toUser: true,
            },
        });
        return appointments;
    }
    async appointmentsByUser(filter) {
        const today = new Date();
        const userExist = await this.prisma.user.findUnique({
            where: {
                id: parseInt(filter.toUser),
            },
        });
        if (!userExist)
            throw new exception_1.UserException(parseInt(filter.toUser));
        const startDate = new Date(Date.parse(filter.startTime));
        const endDate = new Date(Date.parse(filter.endTime));
        if (Date.parse(filter.startTime) < today.valueOf()) {
            throw new common_1.HttpException('Start date must be greater than today', common_1.HttpStatus.BAD_REQUEST);
        }
        if (Date.parse(filter.startTime) > Date.parse(filter.endTime)) {
            throw new common_1.HttpException('End date must be greater than start date', common_1.HttpStatus.BAD_REQUEST);
        }
        const appointments = await this.prisma.appointment.findMany({
            where: {
                AND: [
                    { userId: parseInt(filter.toUser) },
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
                toUser: true,
            },
        });
        return appointments;
    }
    async createAppt(input) {
        const today = new Date();
        const userExist = await this.prisma.user.findUnique({
            where: {
                email: input.toUser,
            },
        });
        if (!userExist) {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.BAD_REQUEST);
        }
        if (Date.parse(input.startTime) < today.valueOf()) {
            throw new common_1.HttpException('Start date must be greater than today', common_1.HttpStatus.BAD_REQUEST);
        }
        if (Date.parse(input.startTime) > Date.parse(input.endTime)) {
            throw new common_1.HttpException('End date must be greater than start date', common_1.HttpStatus.BAD_REQUEST);
        }
        console.log(Date.parse(input.startTime));
        console.log(Date.parse(input.endTime));
        const newAppt = await this.prisma.appointment.create({
            data: Object.assign(Object.assign({}, input), { toUser: {
                    connect: {
                        email: userExist.email,
                    },
                } }),
            include: {
                toUser: true,
            },
        });
        return newAppt;
    }
    async updateAppt(id, params) {
        const { startTime, endTime } = params;
        const today = new Date();
        if (Date.parse(startTime) < today.valueOf()) {
            throw new common_1.HttpException('Start date must be greater than today', common_1.HttpStatus.BAD_REQUEST);
        }
        if (Date.parse(startTime) > Date.parse(endTime)) {
            throw new common_1.HttpException('End date must be greater than start date', common_1.HttpStatus.BAD_REQUEST);
        }
        try {
            const updateAppt = await this.prisma.appointment.update({
                where: {
                    id: parseInt(id),
                },
                data: Object.assign(Object.assign({}, (startTime && { startTime })), (endTime && { endTime })),
                include: {
                    toUser: true,
                },
            });
            return updateAppt;
        }
        catch (error) {
            if (error instanceof runtime_1.PrismaClientKnownRequestError &&
                error.code === prismaError_1.PrismaError.RecordDoesNotExist) {
                throw new exception_1.ApptException(parseInt(id));
            }
            throw error;
        }
    }
    async deleteAppt(id) {
        try {
            const deleteAppt = await this.prisma.appointment.delete({
                where: {
                    id: parseInt(id),
                },
                include: {
                    toUser: true,
                },
            });
            return deleteAppt;
        }
        catch (error) {
            if (error instanceof runtime_1.PrismaClientKnownRequestError &&
                error.code === prismaError_1.PrismaError.RecordDoesNotExist) {
                throw new exception_1.ApptException(parseInt(id));
            }
            throw error;
        }
    }
};
AppointmentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AppointmentService);
exports.AppointmentService = AppointmentService;
//# sourceMappingURL=appointment.service.js.map