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
const logger_service_1 = require("../logger/logger.service");
const prisma_service_1 = require("../prisma/prisma.service");
const mapped_1 = require("../shared/mapped");
let UsersService = class UsersService {
    constructor(prisma, myLogger) {
        this.prisma = prisma;
        this.myLogger = myLogger;
    }
    async create(newUsers) {
        const result = await this.prisma.user.findUnique({
            where: { email: newUsers.email }
        });
        if (result) {
            throw new common_1.BadRequestException('User is already exist');
        }
        return await this.prisma.user.create({
            data: newUsers
        });
    }
    async findAll() {
        return await this.prisma.user.findMany({
            include: {
                appointments: false,
            }
        });
    }
    async findOne(id) {
        const result = await this.prisma.user.findUnique({
            where: { id },
            include: {
                appointments: true
            }
        });
        if (!result) {
            throw new common_1.NotFoundException();
        }
        return result;
    }
    async update(id, updateUserDto) {
        const result = await this.prisma.user.findUnique({ where: { id } });
        if (!result) {
            throw new common_1.NotFoundException();
        }
        return await this.prisma.user.update({
            where: { id },
            data: updateUserDto,
        });
    }
    async remove(id) {
        const result = await this.prisma.user.findUnique({ where: { id } });
        if (!result) {
            throw new common_1.NotFoundException();
        }
        await this.prisma.user.delete({ where: { id } });
        return result;
    }
    async findByLogin(input) {
        const user = await this.prisma.user.findUnique({
            where: { email: input.email }
        });
        if (!user) {
            throw new common_1.NotFoundException(`${input.email} is not exist`);
        }
        return (0, mapped_1.toUserDto)(user);
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, logger_service_1.LoggerService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map