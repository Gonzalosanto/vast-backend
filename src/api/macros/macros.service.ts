import {Injectable} from '@nestjs/common'
import {BundleStoreNamesService, DevicesService, UipsService, UserAgentsService} from '../../main/index';
import { getDeviceRowData, getRowData, processFileData, saveRecords, splitArrayIntoChunks } from 'src/utils';
import { WhitelistsService } from '../whitelists/whitelists.service';

@Injectable()
export class MacrosService {
    private readonly randomLimit = 4000;
    constructor(private bundleStoreNameService: BundleStoreNamesService,
            private whitelistService: WhitelistsService, 
            private userAgents: UserAgentsService,
            private devices: DevicesService,
            private userIps: UipsService){}

    async getMacros() {
        const mixData = async (bundles: Array<any>) => {
            const deviceData = {
                uas: await this.userAgents.getRandomUas({raw: true}), 
                uips: await this.userIps.getRandomUips(this.randomLimit), 
                deviceids: await this.devices.getRandomDevices(this.randomLimit)
            }
            const deviceDataMixed = deviceData.uas.map((ua, index)=> {
                const uip = deviceData.uips[index].uip
                const deviceid = deviceData.deviceids[index].deviceid
                return {ua: ua.ua, uip, deviceid}
            })
            return bundles.map((bundle, index) => {
                return {...bundle, ...deviceDataMixed[index]}
            })
        }
        const wlsInstances = await this.whitelistService.getAllWhitelists();
        const aids = []
        const bundleListByAID = wlsInstances.map(wl=> {
            aids.push(wl.supply_aid);
            return {aid: wl.supply_aid, bundleList : wl.bundleList}
        });
        const macrosByAID = bundleListByAID.map((bundleList) => {
            const aid = bundleList.aid
            return bundleList.bundleList.map(async (bundles: any) => {
                const bsnValues = []
                bsnValues.push({
                        aid: aid,
                        bundle : bundles.bundle.bundle,
                        name : bundles.name.name,
                        store: bundles.store.store
                })
                return mixData(bsnValues);
            });
        })
        return macrosByAID;
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
