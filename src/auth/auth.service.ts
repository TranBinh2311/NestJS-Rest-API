import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { LogDto } from './dto/login.dto';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtService } from '@nestjs/jwt';
import { User } from '.prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundError } from 'rxjs';
import { Auth } from './entities/auth.entity';
import { UsersService } from '../users/users.service';
import { JwtPayload } from 'jsonwebtoken';
import { UserDto } from 'src/users/dto/user.dto';
import { emit } from 'process';

@Injectable()
export class AuthService {
    
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly prisma: PrismaService
      ) {}
    
    //   async register(userDto: CreateUserDto): Promise<RegistrationStatus> {
    //     let status: RegistrationStatus = {
    //       success: true,
    //       message: 'user registered',
    //     };
    
    //     try {
    //       await this.usersService.create(userDto);
    //     } catch (err) {
    //       status = {
    //         success: false,
    //         message: err,
    //       };
    //     }
    
    //     return status;
    //   }
       async getAll()
       {
           return "Hello";
       }    

      async login(loginUserDto: LogDto): Promise<Auth> {
        // find user in db
        const user = await this.usersService.findByLogin(loginUserDto);
    
        // generate and sign token
        const token = this._createToken(user);
    
        return {
          firstName: user.firstName,
          ...token,
        };
      }
    
      async validateUser(email: string): Promise<UserDto> {
        const user = await this.prisma.user.findUnique({where:{email}})
        if (!user) {
            throw new UnauthorizedException(`Invalid token`);
        }
        return user;
      }
    
      private _createToken({ firstName }: UserDto): any {
        const expiresIn = process.env.EXPIRESIN;
    
        const user: JwtPayload = { firstName };
        const accessToken = this.jwtService.sign(user);
        return {
          expiresIn,
          accessToken,
        };
      }
}
