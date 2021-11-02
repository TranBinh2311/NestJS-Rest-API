import { AppointmentController } from './appointment.controller';
import { AppointmentService } from './appointment.service';
import { PrismaService } from '../prisma/prisma.service'
import { LoggerService } from '../logger/logger.service'
import { PrismaClient } from "@prisma/client";
import { NotFoundException, INestApplication, BadRequestException, HttpException } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { EnumUserRole } from "../users/dto/enum_role";
import { PrismaClientValidationError, PrismaClientKnownRequestError } from '@prisma/client/runtime';

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

    const mockPrismaService = {
        post: {
            findMany: jest.fn().mockResolvedValue([]),
            findUnique: jest.fn().mockResolvedValue({}),
            update: jest.fn().mockResolvedValue({}),
            create: jest.fn().mockResolvedValue({}),
            delete: jest.fn().mockResolvedValue({}),
        },
    };

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
            .spyOn(prismaSevice.user, 'findUnique')
            .mockImplementation((): any => undefined)

        const returnSpy = jest.spyOn(prismaSevice.user, 'create')
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
    it('should not findUser', async () => {
        
        const createSpy = jest.spyOn(appointmentService, 'createApp');
        const findSpy = jest
            .spyOn(prismaSevice.user, 'findUnique')
            .mockImplementation((): any => undefined)

        const returnSpy = jest.spyOn(prismaSevice.user, 'create')
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
    /*******************************BAD REQUEST********************************************/
     /*
    -------------------------------Successfull---------------------------------------
    */ 

    // it('should create an user successfull', async () => {
    //     const createSpy = jest.spyOn(usersService, 'create');

    //     const findSpy = jest
    //         .spyOn(prismaSevice.user, 'findUnique')
    //         .mockImplementation((): any => {
    //             example
    //         })

    //     const returnSpy = jest.spyOn(prismaSevice.user, 'create')
    //         .mockImplementation((): any => {
    //             id: Date.now(),
    //                 example
    //         })

    //     await usersController.create(example)


    //     expect(returnSpy).toBeCalledTimes(1);
    //     expect(createSpy).toBeCalledTimes(1);
    //     expect(findSpy).toHaveBeenCalledTimes(1);
    // })

    // it('should throw bad request when delete an user', async () => {

    //     const deleteSpy = jest.spyOn(usersService, 'remove');
    //     const findSpy = jest.spyOn(prismaSevice.user, 'findUnique')
    //         .mockImplementation((): any => undefined)

    //     try {
    //         await usersController.remove(1);
    //     }
    //     catch (error) {
    //         expect(error).toBeInstanceOf(NotFoundException)
    //     }
    //     const deleteSuccessfullSpy = jest.spyOn(prismaSevice.user, 'delete')
    //         .mockImplementation((): any => undefined)

    //     expect(deleteSpy).toBeCalledTimes(1);
    //     expect(findSpy).toHaveBeenCalledTimes(1);
    //     expect(deleteSuccessfullSpy).toBeCalledTimes(0);
    // })

    // it('should delete successfully when delete an user', async () => {

    //     const deleteSpy = jest.spyOn(usersService, 'remove');
    //     const findSpy = jest.spyOn(prismaSevice.user, 'findUnique')
    //         .mockImplementation((): any => new CreateUserDto)
    //     const deleteSuccessfullSpy = jest.spyOn(prismaSevice.user, 'delete')
    //         .mockImplementation((): any => undefined)

    //     await usersController.remove(1);



    //     expect(deleteSpy).toBeCalledTimes(1);
    //     expect(findSpy).toHaveBeenCalledTimes(1);
    //     expect(deleteSuccessfullSpy).toBeCalledTimes(1);
    // })

})

/* Missing Update*/