import { BadRequestException, Global, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";


@Injectable()
export class checkValid{

    //constructor(private prismaMethod: PrismaService) { }
    public prismaMethod : PrismaService;

    static isValidTimeZone(tz: string): Boolean {
        if (!Intl || !Intl.DateTimeFormat().resolvedOptions().timeZone) {
            throw new Error('Time zones are not available in this environment');
        }
        try {
            Intl.DateTimeFormat(undefined, { timeZone: tz });
            return true;
        }
        catch (ex) {
            return false;
        }
    }

    static validate(value: any) {

        const errors = [];
        const today = new Date().valueOf();
        const startDate = Date.parse(value.startTime)
        const endDate = Date.parse(value.endTime)

        if (startDate >= endDate) {
            errors.push("'End' cannot be earlier than 'Start'")
        }

        if (startDate < today) {
            errors.push("'Start' must be greater than 'Today'")
        }

        if (this.isValidTimeZone((value.timeZone).toString()) === false) {
            errors.push("'Timezone' must be a valid IANA time zone")
        }
        else {
            const now = new Date().toLocaleString("en-US", { timeZone: value.timeZone });
            console.log(now);
        }
        console.log(value);

        console.log(errors);

        if (errors.length > 0) {
            throw new HttpException(
                `Validation failed: ${errors}`,
                HttpStatus.BAD_REQUEST,
            );
        }
        //console.log(errors);
        //return errors;
    }

    static formatErrors(errors: any[]) {
        return errors.map(err => {
            for (let property in err) {
                return err[property];
            }
        }).join(',  ');
    }


}
