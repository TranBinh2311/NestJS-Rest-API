import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AppointmentsService } from './appointments.service';
import { createApptDTO } from './dto/createAppt.dto';
import { updateApptDTO } from './dto/updateAppt.dto';
import { getApptsDTO } from './dto/appts.dto';

@Resolver()
export class AppointmentsResolver {
    constructor(private readonly apptService: AppointmentsService) {}

    @Query('appointments')
    async appointments() {
        return this.apptService.appointments();
    }

    @Query('appointment')
    async appointment(@Args('id') args: string) {
        return this.apptService.appointment(args);
    }

    @Query('appointmentsByUser')
    async appointmentsByUser(@Args('filter') args: getApptsDTO) {
        return this.apptService.appointmentsByUser(args);
    }

    // @Mutation('createAppt')
    // async create(@Args('input') args: createApptDTO) {
    //     return this.apptService.createAppt(args);
    // }

    @Mutation('updateAppt')
    async update(@Args('input') args: updateApptDTO) {
        return this.apptService.updateAppt(args);
    }

    @Mutation('deleteAppt')
    async delete(@Args('id') args: string) {
        return this.apptService.deleteAppt(args);
    }
}
