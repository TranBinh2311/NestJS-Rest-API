import { PrismaService } from "src/prisma/prisma.service";
import { CreateAppointmentDto } from "../dto/create-appointment.dto";
export declare class checkValid {
    prismaMethod: PrismaService;
    static isValidTimeZone(tz: string): Boolean;
    static validate(value: CreateAppointmentDto): void;
    static formatErrors(errors: any[]): string;
}
