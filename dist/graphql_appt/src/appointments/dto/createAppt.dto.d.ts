import { NewAppt } from '../../graphql';
export declare class createApptDTO extends NewAppt {
    readonly user: string;
    readonly start_date: string;
    readonly end_date: string;
}
