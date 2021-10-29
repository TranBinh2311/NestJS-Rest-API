import { UsersController } from './users.controller';
import { UsersService } from './users.service'
import { PrismaService } from '../prisma/prisma.service'
import { LoggerService } from '../logger/logger.service'
import { PrismaClient } from "@prisma/client";
import { NotFoundException, INestApplication, BadRequestException} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { EnumUserRole } from "../users/dto/enum_role";


describe('UserController', () => {

    let usersController: UsersController;
    let usersService: UsersService
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
        usersService = new UsersService(prismaSevice, loggerService);
        usersController = new UsersController(usersService);
    })

    it('should return a list of users', async () => {
        const result = [
            {
                firstName: "Binh",
                lastName: "Tran",
            },
            {
                firstName: "Cuong",
                lastName: "Nguyen",
            }
        ]
        const spy = jest
            .spyOn(usersService, 'findAll')
            .mockImplementation((): any => result)

        expect(await usersController.findAll())
            .toEqual(result);
        expect(spy).toBeCalledTimes(1);
    })


    it('should throw error when creating an user', async () => {
        const example: CreateUserDto = {
            email: "a@gmail.com",
            firstName: "Binh",
            lastName: "Tran",
            birthdate: "1999-11-23T00:00:00.000Z", 
            role: EnumUserRole[0]
        }
        const deleteSpy = jest.spyOn(usersService, 'create');
        const findSpy = jest
            .spyOn(prismaSevice.user, 'findUnique')
            .mockImplementation((): any => undefined)

        try {
            await usersController.create(example);
        }
        catch (error) {
            expect(error).toBeInstanceOf(BadRequestException)
        }
        expect(deleteSpy).toBeCalledTimes(1);
        expect(findSpy).toHaveBeenCalledTimes(1);
    })

    // it('should be deleted when create an user', async () => {
    //     const deleteSpy = jest.spyOn(usersService, 'remove');
    //     const result = 
    //         {
    //             id = 1,
    //             firstName: "Binh",
    //             lastName: "Tran",
    //         };    
    //     const findSpy = jest
    //         .spyOn(prismaSevice.user, 'findUnique')
    //         .mockImplementation((): any => undefined)
    //     expect(await usersController.create(new CreateUserDto()))
    //         .;
    //     expect(deleteSpy).toBeCalledTimes(0);
    //     expect(findSpy).toHaveBeenCalledTimes(1);
    // })



})