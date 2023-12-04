import { Type } from 'class-transformer';
import {IsDataURI, IsNotEmpty, IsNumberString, IsPositive, IsString, IsUrl, Length, ValidateNested} from 'class-validator';
export class CreateWhitelistDto {
    @IsNotEmpty()
    @IsNumberString()
    @IsPositive()
    @Length(4,6)
    supply_aid: string;

    @IsNotEmpty()
    @IsNumberString()
    @IsPositive()
    bsn_id: string;

    @ValidateNested({each: true})
    @Type(()=> Bundle)
    bundleList: Bundle[];
}

class Bundle{
    @IsNotEmpty()
    @IsString()
    @IsDataURI()
    bundle: string;

    @IsNotEmpty()
    @IsString()
    @IsDataURI()
    @IsUrl()
    store: string;

    @IsNotEmpty()
    @IsString()
    @IsDataURI()
    name: string;
}
