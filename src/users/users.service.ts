import { User } from '.prisma/client';
import { HttpException, HttpStatus, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { LoggerService } from '../logger/logger.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login.dto';
import { UserDto } from './dto/user.dto';
import { toUserDto } from '../shared/mapped';

@Injectable()
export class UsersService {

  constructor(private prisma: PrismaService, private myLogger: LoggerService) { }
  /*------------------------------------------CREATE USERS----------------------------------------------------------------------*/
  async create(newUsers: CreateUserDto): Promise<User> {
    const result = await this.prisma.user.findUnique(
      {
        where: { email: newUsers.email }
      }
    )
    if (result) {
      throw new  BadRequestException('User is already exist');
    }

    return await this.prisma.user.create({
      data: newUsers
    })
  }

  /*------------------------------------------GET ALL USER WITHOUT APPOINMENT ----------------------------------------------------------------------*/
  async findAll(): Promise<User[]> {
    //this.myLogger.log(`Find All User`);
    return await this.prisma.user.findMany({
      include: {
        appointments: false,
      }
    });
  }
  /*------------------------------------------GET USER BY ID----------------------------------------------------------------------*/
  async findOne(id: number) {
    const result = await this.prisma.user.findUnique({
      where: { id },
      include: {
        appointments: true
      }
    })
    if (!result) {
      //this.myLogger.warn('User has not already exists');
      throw new NotFoundException();
    }
    return result;
  }
  /*------------------------------------------UPDATE USER----------------------------------------------------------------------*/
  async update(id: number, updateUserDto: UpdateUserDto):Promise<User> {

    const result = await this.prisma.user.findUnique({ where: { id } })
    if (!result) {
      //this.myLogger.warn('User has not already exists');
      // user not found
      throw new NotFoundException();
    }
    return await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    })

  }

  /*------------------------------------------REMOVE USER----------------------------------------------------------------------*/
  async remove(id: number): Promise<User> {

    const result = await this.prisma.user.findUnique({where:{id}})
    if (!result) {
      throw new NotFoundException();
    }
    await this.prisma.user.delete({ where: { id } })
    return result;
  }
  /*------------------------------------------FIND BY LOGIN----------------------------------------------------------------------*/
  async findByLogin(input: LoginUserDto): Promise<UserDto> {
    const user = await this.prisma.user.findUnique({
      where: { email: input.email }
    });
    if (!user) {
      throw new NotFoundException(`${input.email} is not exist`)
    }
    return toUserDto(user)
  }

}


    //  const areEqual = await comparePasswords(user.password, password)

    //   if (!areEqual) {
    //     throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);    
    //    }