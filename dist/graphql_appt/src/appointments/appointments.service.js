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
exports.AppointmentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../src/prisma/prisma.service");
const NotFound_exception_1 = require("../exceptions/NotFound.exception");
const runtime_1 = require("@prisma/client/runtime");
const prismaError_1 = require("../utils/prismaError");
let AppointmentsService = class AppointmentsService {
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
            throw new NotFound_exception_1.ApptNotFoundException(parseInt(id));
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
        const userExist = await this.prisma.user.findUnique({
            where: {
                id: parseInt(filter.user),
            },
        });
        if (!userExist)
            throw new NotFound_exception_1.UserNotFoundException(parseInt(filter.user));
        const startDate = new Date(Date.parse(filter.start_date));
        const endDate = new Date(Date.parse(filter.end_date));
        const appointments = await this.prisma.appointment.findMany({
            where: {
                AND: [
                    { userId: parseInt(filter.user) },
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
    async updateAppt(params) {
        const { id, start_date, end_date } = params;
        const today = new Date();
        if (Date.parse(start_date) < today.valueOf()) {
            throw new common_1.HttpException('Start date must be greater than today', common_1.HttpStatus.BAD_REQUEST);
        }
        if (Date.parse(start_date) > Date.parse(end_date)) {
            throw new common_1.HttpException('End date must be greater than start date', common_1.HttpStatus.BAD_REQUEST);
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
                throw new NotFound_exception_1.ApptNotFoundException(parseInt(id));
            }
            throw error;
        }
    }
};
AppointmentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AppointmentsService);
exports.AppointmentsService = AppointmentsService;
//# sourceMappingURL=appointments.service.js.map