import { PrismaService } from "src/prisma/prisma.service";
export declare class checkValid {
    prismaMethod: PrismaService;
    static isValidTimeZone(tz: string): Boolean;
    static validate(value: any): void;
    static formatErrors(errors: any[]): string;
}
