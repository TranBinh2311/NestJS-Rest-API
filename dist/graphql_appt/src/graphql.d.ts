export declare enum EnumUserRole {
    DOCTOR = "DOCTOR",
    THERAPY = "THERAPY",
    CARE_MANAGER = "CARE_MANAGER"
}
export declare class NewAppt {
    user: string;
    name: string;
    start_date: string;
    end_date: string;
}
export declare class UpdateAppt {
    id: string;
    name?: Nullable<string>;
    start_date?: Nullable<string>;
    end_date?: Nullable<string>;
}
export declare class FilterFindApptsByUser {
    user?: Nullable<string>;
    id?: Nullable<string>;
    name?: Nullable<string>;
    start_date?: Nullable<string>;
    end_date?: Nullable<string>;
}
export declare class NewUser {
    email: string;
    first_name: string;
    last_name: string;
    birthdate?: Nullable<string>;
    role?: Nullable<EnumUserRole>;
    appointments?: Nullable<Nullable<string>[]>;
}
export declare class UpdateUser {
    id: string;
    email?: Nullable<string>;
    first_name?: Nullable<string>;
    last_name?: Nullable<string>;
    birthdate?: Nullable<string>;
    role?: Nullable<EnumUserRole>;
}
export declare class Appointment {
    id: string;
    user: User;
    name: string;
    start_date: string;
    end_date: string;
    createdAt: string;
}
export declare abstract class IQuery {
    abstract appointments(): Appointment[] | Promise<Appointment[]>;
    abstract appointment(id: string): Nullable<Appointment> | Promise<Nullable<Appointment>>;
    abstract appointmentsByUser(filter?: Nullable<FilterFindApptsByUser>): Nullable<Nullable<Appointment>[]> | Promise<Nullable<Nullable<Appointment>[]>>;
    abstract users(): User[] | Promise<User[]>;
    abstract user(id: string): Nullable<User> | Promise<Nullable<User>>;
}
export declare abstract class IMutation {
    abstract createAppt(input?: Nullable<NewAppt>): Appointment | Promise<Appointment>;
    abstract updateAppt(input?: Nullable<UpdateAppt>): Nullable<Appointment> | Promise<Nullable<Appointment>>;
    abstract deleteAppt(id: string): Nullable<Appointment> | Promise<Nullable<Appointment>>;
    abstract createUser(input?: Nullable<NewUser>): User | Promise<User>;
    abstract updateUser(input?: Nullable<UpdateUser>): Nullable<User> | Promise<Nullable<User>>;
    abstract deleteUser(id: string): Nullable<User> | Promise<Nullable<User>>;
}
export declare class User {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    birthdate: string;
    appointments: Appointment[];
    role?: Nullable<EnumUserRole>;
    createdAt: string;
}
declare type Nullable<T> = T | null;
export {};
