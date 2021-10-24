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
exports.HttpErrorFilter = void 0;
const common_1 = require("@nestjs/common");
const logger_service_1 = require("../logger/logger.service");
let HttpErrorFilter = class HttpErrorFilter {
    constructor(logger) {
        this.logger = logger;
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest();
        const response = ctx.getResponse();
        const status = exception.getStatus();
        const errorResponse = {
            code: status,
            timestamp: new Date().toLocaleDateString(),
            path: request.url,
            method: request.method,
            message: exception.message || null,
        };
        common_1.Logger.error(`${request.method}  ${request.url}`, JSON.stringify(errorResponse), 'ExcdceptionFilter');
        response.status(status).json(errorResponse);
    }
};
HttpErrorFilter = __decorate([
    (0, common_1.Catch)(),
    __metadata("design:paramtypes", [logger_service_1.LoggerService])
], HttpErrorFilter);
exports.HttpErrorFilter = HttpErrorFilter;
//# sourceMappingURL=http-error.filter.js.map