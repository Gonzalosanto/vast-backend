import {Injectable} from '@nestjs/common'
import {BundleStoreNamesService, DevicesService, UipsService, UserAgentsService} from '../api/index';
import { getDeviceRowData, getRowData, processFileData, saveRecords, splitArrayIntoChunks } from 'src/utils';

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
        await saveRecords(records, async (rows: any)=>{
            try {
                rows.uas.map((row: any)=> {this.userAgents.create({ ua: row })})
                let uipsWithoutRepeatedValues = [...new Set(rows.uips)].map((row: any) => {return {uip:row}})
                splitArrayIntoChunks(uipsWithoutRepeatedValues).forEach(async chunk => await this.userIps.bulkCreate(chunk));
                let devicesWithoutRepeatedValues = [...new Set(rows.deviceids)].map((row: any) => {return { deviceid: row }})
                splitArrayIntoChunks(devicesWithoutRepeatedValues).forEach(async chunk => await this.devices.bulkCreate(chunk));
            } catch (error) {
                console.log(error)
            }
            
        }, getDeviceRowData);
    }
    updateMacros(macros: any, options: any){
        return;
    }
    deleteMacros(options: any) {
      return;
    }
}
