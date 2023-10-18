import {Injectable} from '@nestjs/common'
import {BundleStoreNamesService, BundlesService, NamesService, DevicesService, StoreNamesService, StoreUrlsService, UipsService, UserAgentsService} from '../api/index';
import { OperatingSystemsService } from 'src/api/operating-systems/operating-systems.service';
import { CreateMacroDto } from './dto/create-macro.dto';
import { CreateBundleStoreNameDto } from 'src/api/bundle-store-names/dto/create-bundle-store-name.dto';
import { processFileData, saveRecords } from 'src/utils';

@Injectable()
export class MacrosService {
    constructor(private bundleStoreNameService: BundleStoreNamesService, 
                private operatingSystemsService: OperatingSystemsService,
                private storeNameService: StoreNamesService,
                private bundleService: BundlesService,
                private storeService: StoreUrlsService,
                private nameService: NamesService,
                private userAgents: UserAgentsService,
                private devices: DevicesService){}

    async getMacros() {
        return this.bundleStoreNameService.findAll();
    }

    async createFromFormData(macros: CreateMacroDto): Promise<any>{
        // this.operatingSystemsService.create(macros.os)
        return;
    }
    //TODO: SET RELATIONSHIPS BTWN TABLES
    async createFromFileData(fileData: any): Promise<any>{
        const records = await processFileData(fileData.data);
        await saveRecords(records, (rows: any)=>{
            rows.bundles.map((row: any)=> {this.bundleService.createBundle({ bundle: row })})
            rows.names.map((row: any) => {this.nameService.create({ name: row})})
            rows.stores.map((row: any) => {this.storeService.create({ store: row})})
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