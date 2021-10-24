"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkValid = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let checkValid = class checkValid {
    static isValidTimeZone(tz) {
        if (!Intl || !Intl.DateTimeFormat().resolvedOptions().timeZone) {
            throw new Error('Time zones are not available in this environment');
        }
        try {
            Intl.DateTimeFormat(undefined, { timeZone: tz });
            return true;
        }
        catch (ex) {
            return false;
        }
    }
    static validate(value) {
        const errors = [];
        const today = new Date().valueOf();
        const startDate = Date.parse(value.startTime);
        const endDate = Date.parse(value.endTime);
        if (startDate >= endDate) {
            errors.push("'End' cannot be earlier than 'Start'");
        }
        if (startDate < today) {
            errors.push("'Start' must be greater than 'Today'");
        }
        if (this.isValidTimeZone((value.timeZone).toString()) === false) {
            errors.push("'Timezone' must be a valid IANA time zone");
        }
        else {
            const now = new Date().toLocaleString("en-US", { timeZone: value.timeZone });
            console.log(now);
        }
        console.log(value);
        console.log(errors);
        if (errors.length > 0) {
            throw new common_1.HttpException(`Validation failed: ${errors}`, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    static formatErrors(errors) {
        return errors.map(err => {
            for (let property in err) {
                return err[property];
            }
        }).join(',  ');
    }
};
checkValid = __decorate([
    (0, common_1.Injectable)()
], checkValid);
exports.checkValid = checkValid;
//# sourceMappingURL=appointment.entity.js.map