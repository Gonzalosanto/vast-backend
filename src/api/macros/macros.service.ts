import { Injectable } from '@nestjs/common'
import { BundleStoreNamesService, DevicesService, UipsService, UserAgentsService } from '../../main/index';
import { processCSVFile } from 'src/utils';
import { readFileSync, unlinkSync } from 'fs';
import path from 'path';
import { randomInt } from 'crypto';
import { Sequelize } from 'sequelize';
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
    async createFromFormData(macros: any): Promise<any> {
        // this.operatingSystemsService.create(macros.os)
        return;
    }

    async readDeviceData(file: Express.Multer.File, option: string) {
        const filePath = path.join(file.destination, file.filename)
        await processCSVFile(readFileSync(filePath), async (row: any) => {
            try {
                if (option === 'devices') await this.createDeviceData(row);
                else if (option === 'bundles') { await this.createBundleData(row); }
            } catch (error) {
                console.log(error)
                unlinkSync(filePath)
            }
        }, (err) => { console.log(err) });
        unlinkSync(filePath)
    }

    async createDeviceData(row: Array<string>): Promise<any> {
        try {
            const deviceid = { deviceid: row[0] };
            const ua = { ua: row[1] };
            const uip = { uip: row[2] };
            await this.userAgents.create(ua);
            await this.userIps.create(uip);
            await this.devices.create(deviceid);
            return;
        } catch (error) {
            console.log(`${error}`);
        }
    }

    async createBundleData(row: any): Promise<void> {
        try {
            const bundle = {
                bundle: row[0],
                name: row[1],
                store: row[2],
                os: row[3]
            };
            await this.bundleStoreNameService.createWithRelationships(bundle);
        } catch (error) {
            console.log(`Error saving bundle data: ${error}`);
        }
    }
}
