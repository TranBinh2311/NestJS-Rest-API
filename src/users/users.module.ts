import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoggerModule } from 'src/logger/logger.module';

@Module({
    imports: [LoggerModule],
    providers: [UsersService, PrismaService],
    controllers: [UsersController],
})
export class UsersModule {}
