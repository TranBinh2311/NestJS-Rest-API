"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationPipe = void 0;
const common_1 = require("@nestjs/common");
const appointment_entity_1 = require("./appointment.entity");
let ValidationPipe = class ValidationPipe extends appointment_entity_1.checkValid {
    async transform(value, metadata) {
        if (value instanceof Object && this.isEmpty(value)) {
            throw new common_1.HttpException('Validation failed: No body submitted', common_1.HttpStatus.BAD_REQUEST);
        }
        const { metatype } = metadata;
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }
        const errors = [];
        const today = new Date().valueOf();
        const startDate = Date.parse(value.startTime);
        const endDate = Date.parse(value.endTime);
        if (value.toUser == '' || value.startTime == '' || value.endTime == '' || value.timeZone == '') {
            errors.push('one of the input is missing');
        }
        if (startDate > endDate) {
            errors.push("'End' cannot be earlier than 'Start'");
        }
        if (startDate < today) {
            errors.push(errors, " 'Start' must be greater than 'Today'");
        }
        if (this.isValidTimeZone(value.timeZone) === true) {
            errors.push(errors, "'Timezone' must be a valid IANA time zone");
        }
        else {
            const now = new Date().toLocaleString("en-US", { timeZone: value.timeZone });
            console.log(now);
        }
        console.log(errors);
        if (errors.length > 0) {
            throw new common_1.HttpException(`Validation failed: ${this.formatErrors(errors)}`, common_1.HttpStatus.BAD_REQUEST);
        }
        return value;
    }
    toValidate(metatype) {
        const types = [String, Boolean, Number, Array, Object];
        return !types.find(type => metatype === type);
    }
    formatErrors(errors) {
        return errors.map(err => {
            for (let property in err) {
                return err.constraints[property];
            }
        }).join(',  ');
    }
    isEmpty(value) {
        if (Object.keys(value).length > 0) {
            return false;
        }
        return true;
    }
    check(errors, message) {
        errors.map(err => {
            for (let property in err.constraints) {
                return err.constraints[property] = message;
            }
        });
    }
};
ValidationPipe = __decorate([
    (0, common_1.Injectable)()
], ValidationPipe);
exports.ValidationPipe = ValidationPipe;
//# sourceMappingURL=valid_fake.pipe.js.map