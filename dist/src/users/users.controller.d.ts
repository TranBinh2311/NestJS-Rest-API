import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(newUsers: CreateUserDto): Promise<import(".prisma/client").User>;
    findAll(): Promise<(import(".prisma/client").User & {
        appointments: import(".prisma/client").Appointment[];
    })[]>;
    findOne(id: string): Promise<import(".prisma/client").User>;
    update(email: string, updateUserDto: UpdateUserDto): Promise<import(".prisma/client").User>;
    remove(email: string): Promise<string>;
}
