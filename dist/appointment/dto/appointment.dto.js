"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApptsDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_appointment_dto_1 = require("./create-appointment.dto");
class getApptsDTO extends (0, swagger_1.PartialType)(create_appointment_dto_1.CreateAppointmentDto) {
}
exports.getApptsDTO = getApptsDTO;
//# sourceMappingURL=appointment.dto.js.map