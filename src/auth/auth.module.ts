import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './jwt-auth.gaurd';
import { UsersService } from '../users/users.service';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategies';



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
        expiresIn: '600s'
      })
    })],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, UsersService, JwtStrategy],
  exports: [ AuthModule ]
})
export class AuthModule {}
