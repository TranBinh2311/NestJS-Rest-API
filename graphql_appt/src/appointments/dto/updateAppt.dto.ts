import { IsString } from 'class-validator';
import { UpdateAppt } from '../../graphql';

export class updateApptDTO extends UpdateAppt {
    @IsString()
    id: string;

    @IsString()
    start_date: string;

    @IsString()
    end_date: string;
}
