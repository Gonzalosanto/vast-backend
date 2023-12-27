import { Type } from 'class-transformer';
import {IsDataURI, IsNotEmpty, IsNumber, IsPositive, IsString, IsUrl, Length, ValidateNested, isNumber} from 'class-validator';
import { WhitelistMetadata } from 'src/api/whitelist_metadata/entities/whitelist_metadata.entity';
export class CreateWhitelistDto {
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    @Length(4,6)
    supply_aid: number;

    @IsNumber()
    bsn_id?: number | null;

    @ValidateNested({each: true})
    @Type(()=> Bundle)
    bundleList: Bundle[] | null;

    metadata: WhitelistMetadata;
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
