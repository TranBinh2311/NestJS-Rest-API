import { AuthService } from './auth.service';
import { UserDto } from '../users/dto/user.dto';
declare const LocalStrategy_base: new (...args: any[]) => any;
export declare class LocalStrategy extends LocalStrategy_base {
    private readonly authService;
    constructor(authService: AuthService);
    validate(email: string): Promise<UserDto>;
}
export {};
