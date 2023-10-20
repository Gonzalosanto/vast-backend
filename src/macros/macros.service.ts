import {Injectable} from '@nestjs/common'
import {BundleStoreNamesService, BundlesService, NamesService, DevicesService, StoreNamesService, StoreUrlsService, UipsService, UserAgentsService} from '../api/index';
import { OperatingSystemsService } from 'src/api/operating-systems/operating-systems.service';
import { getDeviceRowData, getRowData, processFileData, saveRecords } from 'src/utils';

@Injectable()
export class MacrosService {
    constructor(private bundleStoreNameService: BundleStoreNamesService, 
                private operatingSystemsService: OperatingSystemsService,
                private storeNameService: StoreNamesService,
                private bundleService: BundlesService,
                private storeService: StoreUrlsService,
                private nameService: NamesService,
                private userAgents: UserAgentsService,
                private devices: DevicesService,
                private userIps: UipsService){}

    async getMacros() {
        return this.bundleStoreNameService.findAll();
    }

    //TODO: Implement creation from form data.
    async createFromFormData(macros: any): Promise<any>{
        // this.operatingSystemsService.create(macros.os)
        return;
    }
    //TODO: SET RELATIONSHIPS BTWN stores, names (storeNames tbl), and bundles, storeNames (bsn)
    async createFromFileData(fileData: any): Promise<any>{
        const records = await processFileData(fileData.data);
        const osInstances = (await this.operatingSystemsService.findAll()).map(os => {return {id: os.dataValues.id, os: os.dataValues.os}});
        await saveRecords(records, (rows: any)=>{
            rows.bundles.map((row: any)=> {this.bundleService.createBundle({ bundle: row })})
            rows.names.map((row: any) => {this.nameService.create({ name: row})})
            rows.stores.map((row: any) => {this.storeService.create(row)})
            rows.os.map((os: string) => this.operatingSystemsService.create({os: os}))

            rows.bundle_list.map(async (row: any)=>{
                const osId = osInstances.filter(os => {if(os.os == row.os) return os})[0]
                this.storeService.update('store',row.store, {'operatingSystemId': osId.id})
            })
        }, getRowData);
    }

    async createDevicesFromFileData(fileData: any): Promise<any>{
        const records = await processFileData(fileData.data);
        await saveRecords(records, (rows: any)=>{
            rows.uas.map((row: any)=> {this.userAgents.create({ ua: row })})
            rows.uips.map((row: any)=> this.userIps.create({uip:row}))
            rows.deviceids.map((row: any)=> this.devices.create({deviceid: row}))
        }, getDeviceRowData);
    }
    updateMacros(macros: any, options: any){
        return;
    }

    deleteMacros(options: any){
        return;
    }
}