import { IsString, IsNotEmpty } from 'class-validator';
import { NewAppt } from '../../graphql';

export class createApptDTO extends NewAppt {
    @IsString()
    @IsNotEmpty()
    readonly user: string;

    @IsString()
    @IsNotEmpty()
    readonly start_date: string;

    @IsString()
    @IsNotEmpty()
    readonly end_date: string;
}
