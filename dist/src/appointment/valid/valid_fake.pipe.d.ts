import { ArgumentMetadata, PipeTransform } from "@nestjs/common";
import { checkValid } from "./appointment.entity";
export declare class ValidationPipe extends checkValid implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata): Promise<any>;
    private toValidate;
    private formatErrors;
    private isEmpty;
    private check;
}
