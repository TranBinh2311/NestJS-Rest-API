import { NotFoundException } from '@nestjs/common';

export class ApptException extends NotFoundException {
    constructor(apptId: number) {
        super(`Appointment with id ${apptId} not found`);
    }
}

export class UserException extends NotFoundException {
    constructor(userId: number) {
        super(`User with id ${userId} not found`);
    }
}