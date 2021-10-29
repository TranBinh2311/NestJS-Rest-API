import { FilterFindApptsByUser } from '../../graphql';
export declare class getApptsDTO extends FilterFindApptsByUser {
    user: string;
    start_date: string;
    end_date: string;
}
