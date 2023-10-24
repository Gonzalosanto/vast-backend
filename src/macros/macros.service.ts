import {Injectable} from '@nestjs/common'
import {BundleStoreNamesService, DevicesService, UipsService, UserAgentsService} from '../api/index';
import { getDeviceRowData, getRowData, processFileData, saveRecords } from 'src/utils';

@Injectable()
export class MacrosService {
    constructor(private bundleStoreNameService: BundleStoreNamesService,
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
    async createFromFileData(fileData: any): Promise<any>{
        const records = await processFileData(fileData.data);
        await saveRecords(records, (rows: any)=>{
            rows.bundle_list.map( async(bundle_row: any)=> {
                await this.bundleStoreNameService.createWithRelationships(bundle_row);
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