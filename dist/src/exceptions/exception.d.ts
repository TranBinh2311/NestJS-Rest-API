import { NotFoundException } from '@nestjs/common';
export declare class ApptException extends NotFoundException {
    constructor(apptId: number);
}
export declare class UserException extends NotFoundException {
    constructor(userId: number);
}
