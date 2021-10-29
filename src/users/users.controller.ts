import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UsePipes, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ValidationPipe } from '../shared/validation.pip';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.gaurd';


@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Create User'
  })
  async create(@Body(new ValidationPipe()) newUsers: CreateUserDto) {
    return this.usersService.create(newUsers);
  }

  /*---------------------------------------------GET ALL USERS-------------------------------------------------------------------*/
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get All User'
  })
  async findAll() {
    return this.usersService.findAll();
  }
  /*---------------------------------------------GET USER BY ID-------------------------------------------------------------------*/
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Get User by ID'
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }
  /*------------------------------------------------UPDATE USER----------------------------------------------------------------*/
  @Patch('updateUser/:id')
  @ApiResponse({
    status: 200,
    description: 'Update User'
  })
  async update(@Param('id', ParseIntPipe) id: number, @Body(new ValidationPipe) updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  /*-------------------------------------------------REMOVE USER---------------------------------------------------------------*/
  @ApiResponse({
    status: 204,
    description: 'Remove/Detele User'
  })
  @Delete('deteleUser/:id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }

}
