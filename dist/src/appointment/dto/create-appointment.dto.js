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
exports.CreateAppointmentDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const appointment_entity_1 = require("../valid/appointment.entity");
class CreateAppointmentDto extends appointment_entity_1.checkValid {
    validate() {
        const loi = [];
        const today = new Date().valueOf();
        const startDate = Date.parse(this.startTime);
        const endDate = Date.parse(this.endTime);
        if (startDate > endDate) {
            loi.push("'End' cannot be earlier than 'Start'");
        }
        if (startDate < today) {
            loi.push("'Start' must be greater than 'Today'");
        }
        if (this.isValidTimeZone(this.timeZone) === true) {
            loi.push("'Timezone' must be a valid IANA time zone");
        }
        else {
            const now = new Date().toLocaleString("en-US", { timeZone: this.timeZone });
        }
        return loi;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateAppointmentDto.prototype, "toUser", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Input must have date format ',
        example: '1999-11-23T00:00:00.000Z'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateAppointmentDto.prototype, "startTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Input must have date format ',
        example: '1999-11-23T00:00:00.000Z'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateAppointmentDto.prototype, "endTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'IANA time zone string ',
        example: 'VietNam/HaNoi'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateAppointmentDto.prototype, "timeZone", void 0);
exports.CreateAppointmentDto = CreateAppointmentDto;
//# sourceMappingURL=create-appointment.dto.js.map