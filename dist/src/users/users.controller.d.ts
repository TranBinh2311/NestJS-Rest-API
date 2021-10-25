import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(newUsers: CreateUserDto): Promise<import(".prisma/client").User>;
    findAll(): Promise<import(".prisma/client").User[]>;
    findOne(id: number): Promise<import(".prisma/client").User & {
        appointments: import(".prisma/client").Appointment[];
    }>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<import(".prisma/client").User>;
    remove(id: number): Promise<import(".prisma/client").User>;
}
