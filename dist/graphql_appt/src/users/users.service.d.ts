import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { createUserDTO } from './dto/createUser.dto';
import { updateUserDTO } from './dto/updateUser.dto';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    createUser(input: createUserDTO): Promise<User>;
    user(id: string): Promise<User | null>;
    users(): Promise<User[] | null>;
    updateUser(params: updateUserDTO): Promise<User>;
    deleteUser(id: string): Promise<User>;
}
