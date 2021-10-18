"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserException = exports.ApptException = void 0;
const common_1 = require("@nestjs/common");
class ApptException extends common_1.NotFoundException {
    constructor(apptId) {
        super(`Appointment with id ${apptId} not found`);
    }
}
exports.ApptException = ApptException;
class UserException extends common_1.NotFoundException {
    constructor(userId) {
        super(`User with id ${userId} not found`);
    }
}
exports.UserException = UserException;
//# sourceMappingURL=exception.js.map