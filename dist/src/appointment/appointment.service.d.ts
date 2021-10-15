import { Appointment } from '.prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { getApptsDTO } from './dto/appointment.dto';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
export declare class AppointmentService {
    private prisma;
    constructor(prisma: PrismaService);
    appointment(id: string): Promise<Appointment | null>;
    appointments(): Promise<Appointment[]>;
    appointmentsByUser(filter: getApptsDTO): Promise<Appointment[]>;
    createAppt(input: CreateAppointmentDto): Promise<Appointment>;
    updateAppt(id: string, params: UpdateAppointmentDto): Promise<Appointment>;
    deleteAppt(id: string): Promise<Appointment>;
}
