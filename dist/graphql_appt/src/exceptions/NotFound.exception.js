"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserNotFoundException = exports.ApptNotFoundException = void 0;
const common_1 = require("@nestjs/common");
class ApptNotFoundException extends common_1.NotFoundException {
    constructor(apptId) {
        super(`Appointment with id ${apptId} not found`);
    }
}
exports.ApptNotFoundException = ApptNotFoundException;
class UserNotFoundException extends common_1.NotFoundException {
    constructor(userId) {
        super(`User with id ${userId} not found`);
    }
}
exports.UserNotFoundException = UserNotFoundException;
//# sourceMappingURL=NotFound.exception.js.map