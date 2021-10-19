import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common'
import { LoggerService } from 'src/logger/logger.service';


@Catch()

export class HttpErrorFilter implements ExceptionFilter {
    constructor(private logger: LoggerService) { }
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest();
        const response = ctx.getResponse();
        const status = exception.getStatus()

        const errorResponse = {
            code: status,
            timestamp: new Date().toLocaleDateString(),
            path: request.url,
            method: request.method,
            message: exception.message || null,
        }

        Logger.error(`${request.method}  ${request.url}`,
            JSON.stringify(errorResponse),
            'ExceptionFilter')

        response.status(status).json(errorResponse);

    }
}