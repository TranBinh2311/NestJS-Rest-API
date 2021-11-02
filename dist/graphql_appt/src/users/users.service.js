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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../src/prisma/prisma.service");
const runtime_1 = require("@prisma/client/runtime");
const prismaError_1 = require("../utils/prismaError");
let UsersService = class UsersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createUser(input) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: input.email,
            },
        });
        if (user)
            throw new common_1.HttpException('User is already exist', common_1.HttpStatus.BAD_REQUEST);
        const newUser = await this.prisma.user.create({
            data: input,
            include: {
                appointments: true,
            },
        });
        return newUser;
    }
    async user(id) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: parseInt(id),
            },
            include: {
                appointments: true,
            },
        });
        if (!user)
            throw new common_1.NotFoundException();
        return user;
    }
    async users() {
        return this.prisma.user.findMany({
            include: {
                appointments: true,
            },
        });
    }
    async updateUser(params) {
        const { id, first_name, last_name, birthdate, role } = params;
        try {
            const updateUser = await this.prisma.user.update({
                where: {
                    id: parseInt(id),
                },
                data: Object.assign(Object.assign(Object.assign(Object.assign({}, (first_name && { first_name })), (last_name && { last_name })), (birthdate && { birthdate })), (role && { role })),
                include: {
                    appointments: true,
                },
            });
            return updateUser;
        }
        catch (error) {
            if (error instanceof runtime_1.PrismaClientKnownRequestError &&
                error.code === prismaError_1.PrismaError.RecordDoesNotExist) {
                throw new common_1.NotFoundException();
            }
            throw error;
        }
    }
    async deleteUser(id) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: parseInt(id),
            },
            include: {
                appointments: true,
            },
        });
        if (!user)
            throw new common_1.NotFoundException();
        const deleteUser = this.prisma.user.delete({
            where: {
                id: parseInt(id),
            },
        });
        const deleteAppts = this.prisma.appointment.deleteMany({
            where: {
                userId: parseInt(id),
            },
        });
        await this.prisma.$transaction([deleteAppts, deleteUser]);
        return user;
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map