import { PrismaService } from 'src/prisma/prisma.service';
import { Appointment } from '@prisma/client';
import { updateApptDTO } from './dto/updateAppt.dto';
import { getApptsDTO } from './dto/appts.dto';
export declare class AppointmentsService {
    private prisma;
    constructor(prisma: PrismaService);
    appointment(id: string): Promise<Appointment | null>;
    appointments(): Promise<Appointment[]>;
    appointmentsByUser(filter: getApptsDTO): Promise<Appointment[]>;
    updateAppt(params: updateApptDTO): Promise<void>;
    deleteAppt(id: string): Promise<Appointment>;
}
