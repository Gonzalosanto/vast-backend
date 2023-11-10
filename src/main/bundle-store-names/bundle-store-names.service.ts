import { Inject, Injectable } from '@nestjs/common';
import { CreateBundleStoreNameDto } from './dto/create-bundle-store-name.dto';
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
    try {
      const osInstance = await this.operatingSystemService.create({os: bundleStoreNameObject.os});
      const storeInstance = await this.storeService.create({store: bundleStoreNameObject.store});
      await this.storeService.update('operatingSystemId', storeInstance, {operatingSystemId: osInstance.id})
  
      const nameInstance = await this.namesService.create({name: bundleStoreNameObject.name});
      const bundleInstance = await this.bundleService.createBundle({bundle: bundleStoreNameObject.bundle});
  
      const storeNameInstance = await this.storeNameService.create({applicationNameId: nameInstance, applicationStoreId: storeInstance});
      await this.create({storeNameId: storeNameInstance[0].dataValues.sn_id,applicationBundleId: bundleInstance[0].dataValues.id})
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
          attributes: ['store']
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
        store: b["storeName.applicationStore.store"]
      }
    })
  }

  async findBy(where: any, options: any){
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