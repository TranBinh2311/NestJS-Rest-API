import { UpdateUser, EnumUserRole } from '../../graphql';
export declare class updateUserDTO extends UpdateUser {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    birthdate: string;
    role: EnumUserRole;
}
