import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerService } from './logger/logger.service';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService: ConfigService = app.get(ConfigService);
    const logger: LoggerService = new LoggerService();

    app.enableCors();
    logger.verbose(`Database URL => ${configService.get('database.URL')}`);
    logger.verbose(`Application listening on port => ${process.env.PORT}`);
    await app.listen(3000);
}
bootstrap();
