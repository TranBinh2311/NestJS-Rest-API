"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const logger_service_1 = require("./logger/logger.service");
const config_1 = require("@nestjs/config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    const logger = new logger_service_1.LoggerService();
    app.enableCors();
    logger.verbose(`Database URL => ${configService.get('database.URL')}`);
    logger.verbose(`Application listening on port => ${process.env.PORT}`);
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map