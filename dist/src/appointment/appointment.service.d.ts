import { Appointment } from '.prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { getApptsDTO } from './dto/appointment.dto';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
export declare class AppointmentService {
    private prisma;
    constructor(prisma: PrismaService);
    appointment(id: number): Promise<Appointment>;
    appointmentsByUser(filter: getApptsDTO): Promise<Appointment[]>;
    createApp(input: CreateAppointmentDto): Promise<Appointment>;
    updateApp(id: number, params: UpdateAppointmentDto): Promise<Appointment>;
    deleteApp(id: number): Promise<Appointment>;
}
