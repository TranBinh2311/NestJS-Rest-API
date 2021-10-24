import { Logger } from '@nestjs/common';
export declare class LoggerService extends Logger {
    error(message: any, trace?: string, context?: string): void;
    warn(message: any, context?: string): void;
    log(message: any, context?: string): void;
    debug(message: any, context?: string): void;
    verbose(message: any, context?: string): void;
}
