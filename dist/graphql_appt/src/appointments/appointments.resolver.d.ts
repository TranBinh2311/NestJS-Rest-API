import { AppointmentsService } from './appointments.service';
import { updateApptDTO } from './dto/updateAppt.dto';
import { getApptsDTO } from './dto/appts.dto';
export declare class AppointmentsResolver {
    private readonly apptService;
    constructor(apptService: AppointmentsService);
    appointments(): Promise<import(".prisma/client").Appointment[]>;
    appointment(args: string): Promise<import(".prisma/client").Appointment>;
    appointmentsByUser(args: getApptsDTO): Promise<import(".prisma/client").Appointment[]>;
    update(args: updateApptDTO): Promise<void>;
    delete(args: string): Promise<import(".prisma/client").Appointment>;
}
