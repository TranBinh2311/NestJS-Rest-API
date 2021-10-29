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
const prismaError_1 = require("../utils/prismaError");
let AppointmentService = class AppointmentService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async appointment(id) {
        const result = await this.prisma.appointment.findUnique({
            where: { id }
        });
        if (!result)
            throw new common_1.NotFoundException();
        return result;
    }
    async appointmentsByUser(filter) {
        const today = new Date();
        const startDate = new Date(Date.parse(filter.startTime));
        const endDate = new Date(Date.parse(filter.endTime));
        return await this.prisma.appointment.findMany({
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
    }
    async createApp({ toUser, startTime, endTime, timeZone }) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: toUser
            }
        });
        if (!user) {
            throw new common_1.NotFoundException();
        }
        return await this.prisma.appointment.create({
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
    }
    async updateApp(id, params) {
        const { startTime, endTime } = params;
        const today = new Date();
        try {
            const updateAppt = await this.prisma.appointment.update({
                where: { id },
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
                throw new common_1.NotFoundException();
            }
            throw error;
        }
    }
    async deleteApp(id) {
        try {
            const deleteAppt = await this.prisma.appointment.delete({
                where: { id },
            });
            return deleteAppt;
        }
        catch (error) {
            if (error instanceof runtime_1.PrismaClientKnownRequestError &&
                error.code === prismaError_1.PrismaError.RecordDoesNotExist) {
                throw new common_1.NotFoundException(`Not found ${id}`);
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