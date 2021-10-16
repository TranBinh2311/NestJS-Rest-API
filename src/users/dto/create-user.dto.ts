import { Global } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { EnumUserRole } from "./enum_role";

@Global()
export class CreateUserDto {
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    lastName: string;

    @ApiProperty()
    @IsString()
    birthdate : string ;


    @ApiProperty()
    @IsEnum(EnumUserRole)
    role : EnumUserRole;

    // @ApiProperty()
    // timeStamp : Date ;
}
    // @ApiProperty()
    // email: string;

    // @ApiProperty()
    // firstName: String;

    // @ApiProperty()
    // lastName :String ;

    // @ApiProperty()
    // birthdate : Date ;

    // @ApiProperty()
    // role : String;

    // @ApiProperty()
    // timeZone : Date;

    // @ApiProperty()
    // timeStamp : Date ;



// email String @unique
//     firstName String
//     lastName String 
//     birthdate DateTime @updatedAt
//     role UserRole
//     timeZone DateTime @updatedAt
//     timeStamp DateTime @updatedAt
//     appointments Appointment[]