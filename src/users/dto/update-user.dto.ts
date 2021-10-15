import { PartialType } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { EnumUserRole } from './enum_role';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    // @IsString()
    // id: string;

    // @IsEmail()
    // @IsString()
    // email: string;

    // @IsString()
    // first_name: string;

    // @IsString()
    // last_name: string;

    // @IsString()
    // birthdate: string;

    // @IsEnum(EnumUserRole)
    // role: EnumUserRole;
}
