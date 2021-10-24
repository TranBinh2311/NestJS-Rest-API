import { LogDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { Auth } from './entities/auth.entity';
import { UsersService } from '../users/users.service';
import { UserDto } from 'src/users/dto/user.dto';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    private readonly prisma;
    constructor(usersService: UsersService, jwtService: JwtService, prisma: PrismaService);
    getAll(): Promise<string>;
    login(loginUserDto: LogDto): Promise<Auth>;
    validateUser(email: string): Promise<UserDto>;
    private _createToken;
}
