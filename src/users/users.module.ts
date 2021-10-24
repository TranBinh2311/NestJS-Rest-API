import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
import { localStrategy } from '../auth/jwt.strategy';
import { JwtService, JwtModule } from '@nestjs/jwt';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    PassportModule.register({
    defaultStrategy: 'jwt',
    property: 'user',
    session: false
  }),
    JwtModule.register({
      secret: 'jwt',
      signOptions: {expiresIn: '60s'}
    })
],
  controllers: [UsersController],
  providers: [UsersService],
  exports:[UsersService]
})
export class UsersModule { }
