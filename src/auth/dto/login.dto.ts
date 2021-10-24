import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { emit } from 'process';
export class LogDto {
    @IsEmail()
    @ApiProperty({
        description: "Input must be email",
        default: "xyz@gmail.com"
    })
    email: string
}