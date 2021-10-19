import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AppointmentModule } from './appointment/appointment.module';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [PrismaModule, UsersModule, AppointmentModule,LoggerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
