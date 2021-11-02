import { PartialType } from '@nestjs/graphql';
import { IsString, IsEmail, IsEnum } from 'class-validator';
import { createUserDTO } from './createUser.dto';

export class updateUserDTO extends PartialType(createUserDTO) {

}
