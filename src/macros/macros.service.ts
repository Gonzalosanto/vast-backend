import {Injectable} from '@nestjs/common'
import {BundleStoreNamesService, BundlesService, NamesService, DevicesService, StoreNamesService, StoreUrlsService, UipsService, UserAgentsService} from '../api/index';
import { OperatingSystemsService } from 'src/api/operating-systems/operating-systems.service';
import { CreateMacroDto } from './dto/create-macro.dto';
import { CreateBundleStoreNameDto } from 'src/api/bundle-store-names/dto/create-bundle-store-name.dto';
import { processFileData, saveRecords } from 'src/utils';

@Injectable()
export class MacrosService {
    constructor(private bundles: BundleStoreNamesService, 
                private operatingSystemsService: OperatingSystemsService,
                private userAgents: UserAgentsService,
                private devices: DevicesService){}

    async getMacros() {
        return this.bundles.findAll();
    }

    async createFromFormData(macros: CreateMacroDto): Promise<any>{
        this.operatingSystemsService.create(macros)
    }

    async createFromFileData(fileData: any): Promise<any>{
        const records = await processFileData(fileData.data);
        await saveRecords(records, (rows: any)=>{
            //Saves Operating system so far, needs to save missing data... rows.bundles.map(...)
            rows.os.map((os: string) => this.operatingSystemsService.create({os: os}))
        });
    }

    updateMacros(macros: any, options: any){
        return;
    }

    deleteMacros(options: any){
        return;
    }
}