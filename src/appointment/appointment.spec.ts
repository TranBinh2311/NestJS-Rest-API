import { AppointmentController } from './appointment.controller';
import { AppointmentService } from './appointment.service';
import { PrismaService } from '../prisma/prisma.service'
import { LoggerService } from '../logger/logger.service'
import { PrismaClient } from "@prisma/client";
import { NotFoundException, INestApplication, BadRequestException, HttpException } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { EnumUserRole } from "../users/dto/enum_role";
import { PrismaClientValidationError, PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { CreateUserDto } from '../users/dto/create-user.dto';

const example : CreateAppointmentDto = {
    toUser: 1,
    startTime: '2021-11-30T00:00:00.000Z',
    endTime: '2021-11-31T00:00:00.000Z',
    timeZone: 'Europe/London',
}
describe('UserController', () => {

    let appointmentController: AppointmentController;
    let appointmentService: AppointmentService
    let prismaSevice: PrismaService
    let loggerService: LoggerService


    beforeAll(() => console.log('this is logged once'))
    beforeEach(() => {

        console.log('this is logged twice');
        prismaSevice = new PrismaService();
        appointmentService = new AppointmentService(prismaSevice);
        appointmentController = new AppointmentController(appointmentService);
    })

    
    /*
    -------------------------------Invalide Input ---------------------------------------
    */ 
    it('should throw error because end Time is smaller than start Time ', async () => {
        const wrong_example = { // endTime is smaller than starttime
            toUser: 1,
            startTime: '2021-11-31T00:00:00.000Z',
            endTime: '2021-11-30T00:00:00.000Z',
            timeZone: 'Europe/London',
        }
        const createSpy = jest.spyOn(appointmentService, 'createApp');
        const findSpy = jest
            .spyOn(prismaSevice.appointment, 'findUnique')
            .mockImplementation((): any => undefined)

        const returnSpy = jest.spyOn(prismaSevice.appointment, 'create')
            .mockImplementation((): any => {
                id: Date.now(),
                example
            })

        try {
            await appointmentController.createOneApp(wrong_example);
        }
        catch (error) {
            expect(error).toBeInstanceOf(HttpException)
        }

        expect(createSpy).toBeCalledTimes(0);
        expect(findSpy).toHaveBeenCalledTimes(0);
        expect(returnSpy).toBeCalledTimes(0);
    })
    /*
    -------------------------------Valide Input ---------------------------------------
    */ 
   /*******************************NOT FOUND********************************************/
    it('should not find user when creating appointment', async () => {
        
        const createSpy = jest.spyOn(appointmentService, 'createApp');
        const findSpy = jest
            .spyOn(prismaSevice.user, 'findUnique')
            .mockImplementation((): any => undefined)

        const returnSpy = jest.spyOn(prismaSevice.appointment, 'create')
            .mockImplementation((): any => {
                id: Date.now(),
                example
            })
        try {
            await appointmentController.createOneApp(example);
        }
        catch (error) {
            expect(error).toBeInstanceOf(NotFoundException)
        }

        expect(createSpy).toBeCalledTimes(1);
        expect(findSpy).toHaveBeenCalledTimes(1);
        expect(returnSpy).toBeCalledTimes(0);
    })
     /*
    -------------------------------Successfull---------------------------------------
    */ 

    it('should create appointment succesfully', async () => {
        
        const createSpy = jest.spyOn(appointmentService, 'createApp');
        const findSpy = jest
            .spyOn(prismaSevice.user, 'findUnique')
            .mockImplementation((): any => new CreateUserDto())

        const returnSpy = jest.spyOn(prismaSevice.appointment, 'create')
            .mockImplementation((): any => {
                id: Date.now(),
                example
            })
        try {
            await appointmentController.createOneApp(example);
        }
        catch (error) {
            expect(error).toBeInstanceOf(null)
        }

        expect(createSpy).toBeCalledTimes(1);
        expect(findSpy).toHaveBeenCalledTimes(1);
        expect(returnSpy).toBeCalledTimes(1);
    })
    
})

/* Missing Update, Delete*/