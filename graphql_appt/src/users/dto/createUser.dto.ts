import { IsNotEmpty, IsString, IsEmail, IsEnum, IsOptional } from 'class-validator';
import { NewUser, EnumUserRole } from '../../graphql';

export class createUserDTO extends NewUser {
    
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    readonly email: string;

    /*---------------------------------------------------------------------------------------------*/
    
    @IsString()
    @IsNotEmpty()
    readonly firstName: string;

    /*---------------------------------------------------------------------------------------------*/
    
    @IsString()
    @IsNotEmpty()
    readonly lastName: string;

    /*---------------------------------------------------------------------------------------------*/
    
    @IsOptional()
    @IsString()
    readonly birthdate: string;

    /*---------------------------------------------------------------------------------------------*/
    
    @IsEnum(EnumUserRole)
    readonly role: EnumUserRole;
}
