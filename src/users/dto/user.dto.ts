import { IsNotEmpty, IsEmail } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  createdAt?: Date;
}