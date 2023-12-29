import { Injectable } from '@nestjs/common'
import { BundleStoreNamesService, DevicesService, StoreUrlsService, UipsService, UserAgentsService } from '../../main/index';
import { processCSVFile } from 'src/utils';
import { readFileSync, unlinkSync } from 'fs';
import path from 'path';
import { WhitelistsService } from '../whitelists/whitelists.service';

@Injectable()
export class MacrosService {
  private readonly randomLimit = 1000;

  constructor(
    private bundleStoreNameService: BundleStoreNamesService,
    private storeService: StoreUrlsService,
    private whitelistService: WhitelistsService,
    private userAgents: UserAgentsService,
    private devices: DevicesService,
    private userIps: UipsService,
  ) {}

  async getMacros() {
    const mixData = async (bundles: Array<any>) => {
      const results = bundles.map( async (bundle) => {
        const bundleOS = await this.storeService.getOS(bundle.store)
        const ua = (await this.userAgents.getUserAgentByOS(bundleOS)).ua;
        const deviceId = (await this.devices.getRandomDevice()).deviceid;
        const uip = (await this.userIps.getRandomUip()).uip;

        return {...bundle, ua, deviceId, uip};
      })
      return results;
    };

    const wlsInstances = await this.whitelistService.getAllEnabledWhitelists();
    console.log(wlsInstances)
    const bundleListByAID = wlsInstances.map((wl) => {
      console.log(wl.bundleList)
      return {aid: wl.supply_aid, bundleList: wl.bundleList}
    });
    //console.log(bundleListByAID)
    
    const bsnValues = bundleListByAID.flatMap((bundleList) => {
      const aid = bundleList.aid;
      return bundleList.bundleList.map((bundles: any) => {return ({
        aid: aid,
        bundle: bundles.bundle,
        name: bundles.name,
        store: bundles.store,
      })});
    });

    let res = await mixData(bsnValues);
    res = await Promise.all(res)
    return res; 
  }

  //TODO: Implement creation from form data
  async createFromFormData(macros: any): Promise<any> {
    // this.operatingSystemsService.create(macros.os)
    return;
  }

  async readDeviceData(file: Express.Multer.File, option: string) {
    const filePath = path.join(file.destination, file.filename);
    await processCSVFile(readFileSync(filePath), async (row: any) => {
      try {
        if (option === 'devices') await this.createDeviceData(row);
        else if (option === 'bundles') {
          await this.createBundleData(row);
        }
      } catch (error) {
        console.log(error);
        unlinkSync(filePath);
      }
    }, (err) => {
      console.log(err);
    });
    unlinkSync(filePath);
  }

  async createDeviceData(rows: Array<string>): Promise<any> {
    try {
      const deviceSet = new Set();
      const uaSet = new Set();
      const uipSet = new Set();
      rows.forEach((row) => {
        deviceSet.add(row[0]);
        uaSet.add(row[1]);
        uipSet.add(row[2]);
      });
      for await (const device of deviceSet) {
        await this.devices.create({ deviceid: device });
      }
      for await (const ua of uaSet) {
        await this.userAgents.create({ ua: ua });
      }
      for await (const uip of uipSet) {
        await this.userIps.create({ uip: uip });
      }
    } catch (error) {
      console.log(`${error}`);
    }
  }

  async createBundleData(rows: Array<any>): Promise<void> {
    try {
      const bundleSet = new Set();
      const nameSet = new Set();
      const storeSet = new Set();
      const osSet = new Set();
      const recordsSet = new Set();
      rows.forEach((row) => {
        bundleSet.add(row[0]);
        nameSet.add(encodeURI(row[1]));
        storeSet.add(encodeURI(row[2]));
        osSet.add(row[3]);
        recordsSet.add({
          bundle: row[0],
          name: encodeURI(row[1]),
          store: encodeURI(row[2]),
          os: row[3],
        });
      });
      const records = {
        osSet,
        bundleSet,
        storeSet,
        nameSet,
        recordsSet,
      };
      await this.bundleStoreNameService.createWithRelationships(records);
    } catch (error) {
      console.log(`Error saving bundle data: ${error}`);
    }
  }
}
