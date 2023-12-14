import { Inject, Injectable } from '@nestjs/common';
import { UpdateBundleStoreNameDto } from './dto/update-bundle-store-name.dto';
import { BundleStoreName } from './entities/bundle-store-name.entity';
import { StoreNames } from '../store-names/entities/store-name.entity';
import { applicationName } from '../names/entities/name.entity'
import { applicationStore } from '../store-urls/entities/store-url.entity'
import { OperatingSystemsService } from '../operating-systems/operating-systems.service';
import { NamesService } from '../names/names.service';
import { StoreUrlsService } from '../store-urls/store-urls.service';
import { BundlesService } from '../bundles/bundles.service';
import { StoreNamesService } from '../store-names/store-names.service';
import { Op } from 'sequelize';
import { applicationBundle } from '../bundles/entities/bundles.entity';
import { OperatingSystem } from '../operating-systems/entities/operating-system.entity';
@Injectable()
export class BundleStoreNamesService {
  constructor(@Inject('BSN_REPOSITORY') private bundleStoreNameRepository: typeof BundleStoreName,
            private operatingSystemService: OperatingSystemsService,
            private namesService: NamesService,
            private storeService: StoreUrlsService,
            private bundleService: BundlesService,
            private storeNameService: StoreNamesService){}
  async create(createBundleStoreNameDto: any) {
    const currentBundlesStoreNames = await this.findBy({
      [Op.and]:[
      {storeNameId: createBundleStoreNameDto.storeNameId},
      {applicationBundleId: createBundleStoreNameDto.applicationBundleId}
    ]},{})
    if(currentBundlesStoreNames.length > 0) return currentBundlesStoreNames;
    return this.bundleStoreNameRepository.create({storeNameId: createBundleStoreNameDto.storeNameId, applicationBundleId: createBundleStoreNameDto.applicationBundleId}, 
      {include: [StoreNames]});
  }

  async createWithRelationships(bundleStoreNameObject: any){
    const createBundleStoreName = async (bundles: any) => {
      for await (const os of bundles.osSet) {
        await this.operatingSystemService.create({'os': os})
      }
      for await (const store of bundles.storeSet) {
        await this.storeService.create({'store': store})
      }
      for await (const bundle of bundles.bundleSet) {
        await this.bundleService.createBundle({'bundle': bundle})
      }
      for await (const name of bundles.nameSet) {
        await this.namesService.create({'name': name})
      }
    }
    const createRelationships = async (bundles: any) => {
      for await (const record of bundles.recordsSet) {
        const osInstance = (await this.operatingSystemService.findBy({'os': record.os}))[0].dataValues
        await this.storeService.updateOS(osInstance.id, {where: {'store': record.store}})
        
        const nameInstance = (await this.namesService.findBy({'name': record.name}))[0].dataValues;
        const storeInstance = (await this.storeService.findBy({'store': record.store}))[0].dataValues;
        await this.storeNameService.create({applicationNameId: nameInstance.id, applicationStoreId: storeInstance.id});        
      }
      for await (const record of bundles.recordsSet) {
        const nameInstance = (await this.namesService.findBy({'name': record.name}))[0].dataValues;
        const storeInstance = (await this.storeService.findBy({'store': record.store}))[0].dataValues;
        const bundleInstance = (await this.bundleService.findBy({'bundle': record.bundle}))[0].dataValues
        const storeNameInstance = (await this.storeNameService.findBy({'applicationStoreId': storeInstance.id, 'applicationNameId': nameInstance.id}))[0].dataValues;
        await this.create({storeNameId: storeNameInstance.sn_id, applicationBundleId: bundleInstance.id})
      }
    }
    try {
      await createBundleStoreName(bundleStoreNameObject)
      await createRelationships(bundleStoreNameObject)
    } catch (error) {
      console.log(error)
    }
  }

  async findAll(options?: any) {
    const bundles = await this.bundleStoreNameRepository.findAll({
      include: [{
        model: StoreNames, 
        include: [{
          model: applicationName,
          attributes: ['name']
        },
        {
          model: applicationStore,
          include: [{
            model : OperatingSystem, 
          }]
        }],
      },{
        model: applicationBundle,
        attributes: ['bundle']
      }],
      raw: true,
      ...options
    });
    return bundles.map((b: any) => {
      return {
        id: b.bsn_id,
        bundle: b["applicationBundle.bundle"],
        name: b["storeName.applicationName.name"],
        store: b["storeName.applicationStore.store"],
        os: b["storeName.applicationStore.operatingSystem.os"]
      }
    })
  }

  async findBy(where: any, options?: any){
    return this.bundleStoreNameRepository.findAll({where: where, ...options});
  }

  findOne(id: number) {
    return `This action returns a #${id} bundleStoreName`;
  }

  update(id: number, updateBundleStoreNameDto: UpdateBundleStoreNameDto) {
    return `This action updates a #${id} bundleStoreName with ${updateBundleStoreNameDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} bundleStoreName`;
  }
}
