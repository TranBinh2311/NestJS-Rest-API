import { NewUser } from '../../graphql';
export declare class createUserDTO extends NewUser {
    readonly toUser: number;
    readonly startTime: string;
    readonly endTime: string;
    readonly timeZone: string;
}
