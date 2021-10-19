import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { error } from "console";
import { checkValid } from '../valid/appointment.entity'

export class CreateAppointmentDto extends checkValid  {


    

    @ApiProperty()
    @IsNotEmpty()
    readonly toUser: number;

    @ApiProperty({
        description: 'Input must have date format ',
        example: '1999-11-23T00:00:00.000Z'
    })
    @IsString()
    @IsNotEmpty()
    readonly startTime: string;

    @ApiProperty({
        description: 'Input must have date format ',
        example: '1999-11-23T00:00:00.000Z'
    })
    @IsString()
    @IsNotEmpty()
    readonly endTime: string;

    @ApiProperty({
        description: 'IANA time zone string ',
        example: 'VietNam/HaNoi'
    })
    @IsString()
    @IsNotEmpty()
    readonly timeZone: string;

    validate(): string[] {

        const errors = [];
        const today = new Date().valueOf();
        const startDate = Date.parse(this.startTime)
        const endDate = Date.parse(this.endTime)


        if (startDate > endDate) {
            errors.push("'End' cannot be earlier than 'Start'")
        }

        if (startDate < today) {
            errors.push("'Start' must be greater than 'Today'")
        }


        if (this.isValidTimeZone(this.timeZone) === true) {
            errors.push("'Timezone' must be a valid IANA time zone")
        }
        else {
            const now = new Date().toLocaleString("en-US", { timeZone: this.timeZone });
            console.log(now);  
        }

        return errors;
    }


}
