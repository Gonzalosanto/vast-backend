import { Injectable } from '@nestjs/common'
import { BundleStoreNamesService, DevicesService, UipsService, UserAgentsService } from '../../main/index';
import { processCSVFile } from 'src/utils';
import { readFileSync, unlinkSync } from 'fs';
import path from 'path';
import { randomInt } from 'crypto';
import { Sequelize } from 'sequelize';

@Injectable()
export class MacrosService {
    constructor(
        private bundleStoreNameService: BundleStoreNamesService,
        private userAgents: UserAgentsService,
        private devices: DevicesService,
        private userIps: UipsService,
    ) { }

    async getMacros() {
        const randomUips = await this.userIps.getRandomUip(1000);
        const randomDevices = await this.devices.getRandomDevice(1000)

        const bundles = await this.bundleStoreNameService.findAll();
        const getUserAgentByOS = async (os: any) => {
            const ua = await this.userAgents.getUserAgentsByOS(os, {order: Sequelize.literal('rand()'), limit: 1 })
            return ua[0]?.ua ?? ua
        }
        const mixedBundlesXDeviceData = bundles.map( async (bundle) => {
            const ua = await getUserAgentByOS(bundle.os)
            const mixedData = { ...bundle, ua: ua, uip: randomUips[randomInt(randomUips.length - 1)].uip, deviceid: randomDevices[randomInt(randomDevices.length - 1)].deviceid}
            return mixedData;
        });
        return Promise.all(mixedBundlesXDeviceData);
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
