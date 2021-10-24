import { AuthService } from './auth.service';
import { UserDto } from '../users/dto/user.dto';
declare const localStrategy_base: new (...args: any[]) => any;
export declare class localStrategy extends localStrategy_base {
    private readonly authService;
    constructor(authService: AuthService);
    validate(email: string): Promise<UserDto>;
}
export {};
