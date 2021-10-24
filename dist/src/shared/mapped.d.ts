import { User } from '@prisma/client';
import { UserDto } from '../users/dto/user.dto';
export declare const toUserDto: (data: User) => UserDto;
