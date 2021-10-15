import { AppointmentService } from './appointment.service';
import { getApptsDTO } from './dto/appointment.dto';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
export declare class AppointmentController {
    private readonly appointmentService;
    constructor(appointmentService: AppointmentService);
    findAllAppts(): Promise<import(".prisma/client").Appointment[]>;
    findOneAppt(id: string): Promise<import(".prisma/client").Appointment>;
    findApptsByUser(filter: getApptsDTO): Promise<import(".prisma/client").Appointment[]>;
    createOneAppt(input: CreateAppointmentDto): Promise<import(".prisma/client").Appointment>;
    updateOneAppt(id: string, input: UpdateAppointmentDto): Promise<import(".prisma/client").Appointment>;
    deleteOneAppt(id: string): Promise<import(".prisma/client").Appointment>;
}
