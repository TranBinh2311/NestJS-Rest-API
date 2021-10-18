import { EnumUserRole } from "./enum_role";
export declare class CreateUserDto {
    readonly email: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly birthdate: string;
    readonly role: EnumUserRole;
}
