import { ApiProperty } from "@nestjs/swagger";

export class Auth{

    @ApiProperty()
    id: number

    @ApiProperty()
    email: string

    @ApiProperty()
    accessToken: string
}