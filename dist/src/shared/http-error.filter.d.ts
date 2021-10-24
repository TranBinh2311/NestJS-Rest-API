import { ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common';
import { LoggerService } from 'src/logger/logger.service';
export declare class HttpErrorFilter implements ExceptionFilter {
    private logger;
    constructor(logger: LoggerService);
    catch(exception: HttpException, host: ArgumentsHost): void;
}
