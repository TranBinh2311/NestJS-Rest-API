import { Global } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { EnumUserRole } from "./enum_role";


export class CreateUserDto {
    /*---------------------------------------------------------------------------------------------*/
    @ApiProperty({
        description: 'Input must have email format ',
        example: 'a@gmail.com'
    })
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    readonly email: string;

    /*---------------------------------------------------------------------------------------------*/
    @ApiProperty({
        description: 'Input can be not empty',
        example: 'firstName'
    })
    @IsString()
    @IsNotEmpty()
    readonly firstName: string;

    /*---------------------------------------------------------------------------------------------*/
    @ApiProperty({
        description: 'Input can be not empty',
        example: 'lastName'
    })
    @IsString()
    @IsNotEmpty()
    readonly lastName: string;

    /*---------------------------------------------------------------------------------------------*/
    @ApiProperty({
        description: 'Input must have date format ',
        example: '1999-11-23T00:00:00.000Z'
    })
    @IsString()
    readonly birthdate: string;

    /*---------------------------------------------------------------------------------------------*/
    @ApiProperty({
        description: 'must be 1 of the following 3 styles [ DOCTOR, THERAPYCARE, MANAGER] ',
        example: 'DOCTOR'
    })
    @IsEnum(EnumUserRole)
    readonly role : EnumUserRole;
}
 

