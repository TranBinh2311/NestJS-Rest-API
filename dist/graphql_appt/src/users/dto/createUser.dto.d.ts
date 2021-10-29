import { NewUser, EnumUserRole } from '../../graphql';
export declare class createUserDTO extends NewUser {
    readonly email: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly birthdate: string;
    readonly role: EnumUserRole;
}
