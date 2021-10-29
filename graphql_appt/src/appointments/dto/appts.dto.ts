import { IsString } from 'class-validator';
import { FilterFindApptsByUser } from '../../graphql';

export class getApptsDTO extends FilterFindApptsByUser {
    @IsString()
    user: string;

    @IsString()
    start_date: string;

    @IsString()
    end_date: string;
}
