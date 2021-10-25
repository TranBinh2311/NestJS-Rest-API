import { Body, Controller, Get, Post, UseGuards, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';
import { ValidationPipe } from 'src/shared/validation.pip';
import { AuthService } from './auth.service';
import { LogDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.gaurd';
import { LocalAuthGuard } from './guards/local-auth.gaurd';



@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //@UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body(new ValidationPipe) input : LogDto) {
      return this.authService.login(input);
  }

  @Get()
  @UseGuards(LocalAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Get All User'
  })
  async getAll() {
    return this.authService.getAll();
}
}
