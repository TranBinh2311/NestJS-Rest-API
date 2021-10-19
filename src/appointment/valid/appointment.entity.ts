import { Global, Injectable } from "@nestjs/common";

@Injectable()
export class checkValid {

    isValidTimeZone(tz: string): Boolean {
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
}
