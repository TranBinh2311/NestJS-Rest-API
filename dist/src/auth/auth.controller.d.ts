import { AuthService } from './auth.service';
import { LogDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(input: LogDto): Promise<import("./entities/auth.entity").Auth>;
    getAll(): Promise<string>;
}
