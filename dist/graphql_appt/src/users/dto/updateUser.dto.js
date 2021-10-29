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
exports.updateUserDTO = void 0;
const class_validator_1 = require("class-validator");
const graphql_1 = require("../../graphql");
class updateUserDTO extends graphql_1.UpdateUser {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], updateUserDTO.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], updateUserDTO.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], updateUserDTO.prototype, "first_name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], updateUserDTO.prototype, "last_name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], updateUserDTO.prototype, "birthdate", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(graphql_1.EnumUserRole),
    __metadata("design:type", String)
], updateUserDTO.prototype, "role", void 0);
exports.updateUserDTO = updateUserDTO;
//# sourceMappingURL=updateUser.dto.js.map