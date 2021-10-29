import { IsString, IsEmail, IsEnum } from 'class-validator';
import { UpdateUser, EnumUserRole } from '../../graphql';

export class updateUserDTO extends UpdateUser {
    @IsString()
    id: string;

    @IsEmail()
    @IsString()
    email: string;

    @IsString()
    first_name: string;

    @IsString()
    last_name: string;

    @IsString()
    birthdate: string;

    @IsEnum(EnumUserRole)
    role: EnumUserRole;
}
