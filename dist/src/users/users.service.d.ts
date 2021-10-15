import { User } from '.prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(newUsers: CreateUserDto): Promise<User>;
    findAll(): Promise<(User & {
        appointments: import(".prisma/client").Appointment[];
    })[]>;
    findOne(id: number): Promise<User>;
    update(email: string, updateUserDto: UpdateUserDto): Promise<User>;
    remove(email: string): Promise<string>;
}
