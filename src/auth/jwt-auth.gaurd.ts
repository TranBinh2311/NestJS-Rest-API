import { Injectable } from "@nestjs/common";
import { AuthGuard, PassportStrategy } from "@nestjs/passport";


Injectable()
export const jwtConstants = {
    secret: 'jwt',
};