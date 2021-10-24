import { checkValid } from '../valid/appointment.entity';
export declare class CreateAppointmentDto extends checkValid {
    readonly toUser: number;
    readonly startTime: string;
    readonly endTime: string;
    readonly timeZone: string;
}
