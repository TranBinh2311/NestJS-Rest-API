import { NotFoundException } from '@nestjs/common';
export declare class ApptNotFoundException extends NotFoundException {
    constructor(apptId: number);
}
export declare class UserNotFoundException extends NotFoundException {
    constructor(userId: number);
}
