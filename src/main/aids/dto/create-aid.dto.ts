import { IsNumberString } from "class-validator";

export class CreateAidDto {
    @IsNumberString()
    supply_aid: number;
}
