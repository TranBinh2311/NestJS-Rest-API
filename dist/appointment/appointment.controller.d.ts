import { AppointmentService } from './appointment.service';
import { getApptsDTO } from './dto/appointment.dto';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
export declare class AppointmentController {
    private readonly appointmentService;
    constructor(appointmentService: AppointmentService);
    findOneApp(id: number): Promise<import(".prisma/client").Appointment>;
    findApptsByUser(filter: getApptsDTO): Promise<import(".prisma/client").Appointment[]>;
    createOneApp(input: CreateAppointmentDto): Promise<import(".prisma/client").Appointment>;
    updateOneAppt(id: number, input: UpdateAppointmentDto): Promise<import(".prisma/client").Appointment>;
    deleteOneAppt(id: number): Promise<import(".prisma/client").Appointment>;
}
