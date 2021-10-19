import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { checkValid } from './valid/appointment.entity';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpErrorFilter } from '../shared/http-error.filter';
import { LoggingInterceptor } from '../shared/logging.interceptor';

@Module({
  controllers: [AppointmentController],
  providers: [AppointmentService, {
    provide: APP_FILTER,
    useClass: HttpErrorFilter
  }, {
    provide: APP_INTERCEPTOR,
    useClass: LoggingInterceptor
  }]
})
export class AppointmentModule { }
