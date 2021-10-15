import { EnumUserRole } from "./enum_role";
export declare class CreateUserDto {
    email: string;
    firstName: string;
    lastName: string;
    birthdate: string;
    role: EnumUserRole;
}
