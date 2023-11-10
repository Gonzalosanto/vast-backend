import {Injectable} from '@nestjs/common'
import {BundleStoreNamesService, DevicesService, UipsService, UserAgentsService} from '../../main/index';
import { getDeviceRowData, getRowData, processFileData, saveRecords, splitArrayIntoChunks } from 'src/utils';

@Injectable()
export class MacrosService {
    constructor(private bundleStoreNameService: BundleStoreNamesService,
                private userAgents: UserAgentsService,
                private devices: DevicesService,
                private userIps: UipsService){}

    async getMacros() {
        const bundles = await this.bundleStoreNameService.findAll();
        const deviceData = {
            uas: await this.userAgents.getRandomUas({raw: true}), 
            uips: await this.userIps.getRandomUips(10000), 
            deviceids: await this.devices.getRandomDevices(10000)
        }
        const deviceDataMixed = deviceData.uas.map((ua, index)=> {
            const uip = deviceData.uips[index].uip
            const deviceid = deviceData.deviceids[index].deviceid
            return {ua: ua.ua, uip, deviceid}})
        const mixedBundlesXDeviceData = bundles.map((bundle, index) => {
            return {...bundle, ...deviceDataMixed[index]}
        })
        return mixedBundlesXDeviceData 
    }
    //TODO: Implement creation from form data
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

    async getRandomUips(){
        return this.userIps.findAll();
    }

    async getRandomDevicesIds(){
        return this.devices.findAll();
    }

    updateMacros(macros: any, options: any){
        return;
    }
    deleteMacros(options: any) {
      return;
    }
}
