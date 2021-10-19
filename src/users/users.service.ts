import { User } from '.prisma/client';
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import e from 'express';
import { LoggerService } from 'src/logger/logger.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {

  constructor(private prisma: PrismaService, private myLogger: LoggerService) { }
  /*Create Account*/
  async create(newUsers: CreateUserDto): Promise<User> {
    const result = await this.prisma.user.findUnique(
      {
        where: { email: newUsers.email }
      }
    )
    if (result) {
      // Wrong data, User is already exist
      throw new HttpException('User is already exist', HttpStatus.BAD_REQUEST);
    }

    return await this.prisma.user.create({
      data: newUsers
    })

  }
  /*Find All User */
  async findAll(): Promise<User[]> {
    this.myLogger.log(`Find All User`);
    const result = await this.prisma.user.findMany();
    return result;
  }
  /*Find by id */
  async findOne(id: number) {
    const result = await this.prisma.user.findUnique({ where: { id } })

    if (!result) {
      throw new NotFoundException();
    }
    return result;
  }
  /*Delete User By Id*/
  async update(id: number, updateUserDto: UpdateUserDto) {

    const result = await this.prisma.user.findUnique({ where: { id } })

    if (!result) {
      // user not found
      throw new NotFoundException();
    }

    return await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    })

  }
  /*Remove Account */
  async remove(id: number): Promise<User> {

    const result = await this.prisma.user.findUnique({ where: { id } })
    if (!result) {
      //user not found
      throw new NotFoundException();
    }

    await this.prisma.user.delete({ where: { id } })
    return result;
  }

}
