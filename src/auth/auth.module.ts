import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './jwt-auth.gaurd';
import { localStrategy } from './jwt.strategy';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersModule } from '../users/users.module';


@Module({
  imports: [
    PrismaModule,
    UsersModule,
    PassportModule.register({
      defaultStrategy: "jwt",
    }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: ({
        expiresIn: '60s'
      })
    })],
  controllers: [AuthController],
  providers: [AuthService, localStrategy, PrismaService, UsersService],
  exports: [PassportModule, JwtModule ,localStrategy]
})
export class AuthModule { }
