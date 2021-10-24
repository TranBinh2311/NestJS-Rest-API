import { User } from '@prisma/client';
import { UserDto } from '../users/dto/user.dto';




export const toUserDto = (data: User): UserDto => {  
    const { id, firstName, email } = data;
    let userDto: UserDto = { id, firstName, email,  };
    return userDto;
};