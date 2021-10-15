import { User } from '.prisma/client';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import e from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {

  constructor(private prisma : PrismaService) {}
 /*Create Account*/ 
  async create(newUsers: CreateUserDto) : Promise<User> {
    const result = await this.prisma.user.findUnique(
      {
        where: {email: newUsers.email} 
      }
    )
    if(result)
    {
      throw new HttpException('User is already exist', HttpStatus.BAD_REQUEST );
    }

    return await this.prisma.user.create({
        data: newUsers
    })
    
  }
  /*Find All */ 
  async findAll() {
    return await this.prisma.user.findMany({include:{appointments:true}})
  }
  /*Find by id */ 
  async findOne(id: number) {
    const result = await this.prisma.user.findUnique({where:{id : id}})
  
    if(!result)
    {
        throw new HttpException('User not found', HttpStatus.BAD_REQUEST );
    }

    return result;
  }
  /*Delete User */ 
  async update( email: string, updateUserDto: UpdateUserDto) {

    const result = await this.prisma.user.findUnique({where:{email : email}})
  
    if(!result)
    {
        throw new HttpException('User not found to update', HttpStatus.BAD_REQUEST );
    }

    return await this.prisma.user.update({
      where: { email : email},
      data: updateUserDto,
    })

  }
  /*Remove Account */ 
  async remove(email: string) {

    const result = await this.prisma.user.findUnique({where:{email : email}})
  
    if(!result)
    {
        throw new HttpException('User not found to update', HttpStatus.BAD_REQUEST );
    }

    await this.prisma.appointment.delete({
      where: { id : result.id}
    })

    await this.prisma.user.deleteMany( {where: {email:email}} )
    return `This ${email} is removed`

  }


}
