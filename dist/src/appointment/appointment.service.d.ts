import { Appointment } from '.prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { getApptsDTO } from './dto/appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
export declare class AppointmentService {
    private prisma;
    constructor(prisma: PrismaService);
    appointment(id: number): Promise<Appointment>;
    appointmentsByUser(filter: getApptsDTO): Promise<Appointment[]>;
    createApp({ toUser, startTime, endTime, timeZone }: {
        toUser: any;
        startTime: any;
        endTime: any;
        timeZone: any;
    }): Promise<Appointment>;
    updateApp(id: number, params: UpdateAppointmentDto): Promise<Appointment>;
    deleteApp(id: number): Promise<Appointment>;
}
