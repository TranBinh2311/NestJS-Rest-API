import {
    IsNotEmpty,
    IsOptional,
    IsString,
    IsEmail,
    IsEnum,
    MaxLength,
} from 'class-validator';
import { Role } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class createUserDTO {
    @ApiProperty({
        example: 'cn1122000@gmail.com',
        description: 'Your email address',
        required: true,
    })
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        example: 'Cuong',
        description: 'Your first name',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    firstName: string;

    @ApiProperty({
        example: 'Nguyen',
        description: 'Your last name',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    lastName: string;

    @IsOptional()
    @ApiProperty({
        example: '2000-12-01T00:00:00.000Z',
        description: 'Your birthdate',
        required: false,
        nullable: true,
    })
    @IsString()
    birthdate: string;

    @ApiProperty({ enum: ['DOCTOR', 'THERAPY', 'CARE_MANAGER'] })
    @IsEnum(Role)
    role: Role;
}
