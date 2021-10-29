import { UsersService } from './users.service';
import { createUserDTO } from './dto/createUser.dto';
import { updateUserDTO } from './dto/updateUser.dto';
export declare class UsersResolver {
    private readonly userService;
    constructor(userService: UsersService);
    posts(): Promise<import(".prisma/client").User[]>;
    post(args: string): Promise<import(".prisma/client").User>;
    create(args: createUserDTO): Promise<import(".prisma/client").User>;
    update(args: updateUserDTO): Promise<import(".prisma/client").User>;
    delete(args: string): Promise<import(".prisma/client").User>;
}
