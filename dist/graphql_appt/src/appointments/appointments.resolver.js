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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const appointments_service_1 = require("./appointments.service");
const updateAppt_dto_1 = require("./dto/updateAppt.dto");
const appts_dto_1 = require("./dto/appts.dto");
let AppointmentsResolver = class AppointmentsResolver {
    constructor(apptService) {
        this.apptService = apptService;
    }
    async appointments() {
        return this.apptService.appointments();
    }
    async appointment(args) {
        return this.apptService.appointment(args);
    }
    async appointmentsByUser(args) {
        return this.apptService.appointmentsByUser(args);
    }
    async update(args) {
        return this.apptService.updateAppt(args);
    }
    async delete(args) {
        return this.apptService.deleteAppt(args);
    }
};
__decorate([
    (0, graphql_1.Query)('appointments'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppointmentsResolver.prototype, "appointments", null);
__decorate([
    (0, graphql_1.Query)('appointment'),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppointmentsResolver.prototype, "appointment", null);
__decorate([
    (0, graphql_1.Query)('appointmentsByUser'),
    __param(0, (0, graphql_1.Args)('filter')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [appts_dto_1.getApptsDTO]),
    __metadata("design:returntype", Promise)
], AppointmentsResolver.prototype, "appointmentsByUser", null);
__decorate([
    (0, graphql_1.Mutation)('updateAppt'),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateAppt_dto_1.updateApptDTO]),
    __metadata("design:returntype", Promise)
], AppointmentsResolver.prototype, "update", null);
__decorate([
    (0, graphql_1.Mutation)('deleteAppt'),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppointmentsResolver.prototype, "delete", null);
AppointmentsResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [appointments_service_1.AppointmentsService])
], AppointmentsResolver);
exports.AppointmentsResolver = AppointmentsResolver;
//# sourceMappingURL=appointments.resolver.js.map