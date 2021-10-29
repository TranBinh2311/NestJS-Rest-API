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
exports.UsersResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const users_service_1 = require("./users.service");
const createUser_dto_1 = require("./dto/createUser.dto");
const updateUser_dto_1 = require("./dto/updateUser.dto");
let UsersResolver = class UsersResolver {
    constructor(userService) {
        this.userService = userService;
    }
    async posts() {
        return this.userService.users();
    }
    async post(args) {
        return this.userService.user(args);
    }
    async create(args) {
        return this.userService.createUser(args);
    }
    async update(args) {
        return this.userService.updateUser(args);
    }
    async delete(args) {
        return this.userService.deleteUser(args);
    }
};
__decorate([
    (0, graphql_1.Query)('users'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "posts", null);
__decorate([
    (0, graphql_1.Query)('user'),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "post", null);
__decorate([
    (0, graphql_1.Mutation)('createUser'),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createUser_dto_1.createUserDTO]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "create", null);
__decorate([
    (0, graphql_1.Mutation)('updateUser'),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateUser_dto_1.updateUserDTO]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "update", null);
__decorate([
    (0, graphql_1.Mutation)('deleteUser'),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "delete", null);
UsersResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersResolver);
exports.UsersResolver = UsersResolver;
//# sourceMappingURL=users.resolver.js.map