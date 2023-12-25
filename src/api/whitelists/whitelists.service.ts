import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateWhitelistDto } from './dto/create-whitelist.dto';
import { UpdateWhitelistDto } from './dto/update-whitelist.dto';
import { Whitelist } from './entities/whitelist.entity';
import { AidsService } from '../../main/aids/aids.service';
import { BundleStoreNamesService, BundlesService, NamesService, StoreNamesService, StoreUrlsService } from '../../main/index';
import { WhitelistMetadataService } from '../whitelist_metadata/whitelist_metadata.service';
import { Op } from 'sequelize';
import { SupplyAid } from '../../main/aids/entities/supply-aid.entity';
import { BundleStoreName } from '../../main/bundle-store-names/entities/bundle-store-name.entity';
import { applicationBundle } from '../../main/bundles/entities/bundles.entity';
import { StoreNames } from '../../main/store-names/entities/store-name.entity';
import { applicationName } from '../../main/names/entities/name.entity';
import { applicationStore } from '../../main/store-urls/entities/store-url.entity';
import { WhitelistMetadata } from '../whitelist_metadata/entities/whitelist_metadata.entity';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class WhitelistsService {
  constructor(
    @Inject('WLS_REPOSITORY') private whitelistsRepository: typeof Whitelist,
    private supplyAidService: AidsService,
    private bundleStoreNameService: BundleStoreNamesService,
    private metadataService: WhitelistMetadataService,
    private bundleService: BundlesService,
    private storeNameService: StoreNamesService,
    private nameService: NamesService,
    private storeService: StoreUrlsService
  ) { }

  async create(createWhitelistDto: CreateWhitelistDto) {
    let bsnInstances = [];
    if (createWhitelistDto.bundleList.length === 0) {
      bsnInstances = await this.bundleStoreNameService.findAll();
    } else {
      const errors = [];
      bsnInstances = await Promise.all(createWhitelistDto.bundleList.map(async (b, i) => {
        const bundleInstanceId = (await this.bundleService.findOne({ "bundle": b.bundle }))?.id;
        const nameInstanceId = (await this.nameService.findOne({ "name": b.name }))?.id;
        const storeInstanceId = (await this.storeService.findOne({ "store": b.store }))?.id;

        if (!bundleInstanceId || !nameInstanceId || !storeInstanceId) {
          errors.push("Combination " + (i + 1) + " doesn't exist");
          console.log(errors)
          return null;
        }
        const storeNameInstanceId = (await this.storeNameService.findBy({ "applicationStoreId": storeInstanceId, "applicationNameId": nameInstanceId }))[0].sn_id;
        return (await this.bundleStoreNameService.findBy({
          [Op.and]: [
            { 'applicationBundleId': bundleInstanceId },
            { 'storeNameId': storeNameInstanceId }
          ],
        }))[0];
      }));
      const filteredInstances = bsnInstances.filter(instance => instance !== null);
      if (errors.length > 0) {
        throw new BadRequestException(errors.join('\n'));
      }
      bsnInstances = filteredInstances;
    }
    const existingSupplyAid = await this.supplyAidService.findOne({ aid: createWhitelistDto.supply_aid });
    const supplyAidInstance = existingSupplyAid ?? (await this.supplyAidService.create({ supply_aid: createWhitelistDto.supply_aid }));

    const currentWhitelistInstance = await this.findOne({'aid_id': supplyAidInstance.id}, {raw: true});
    const metadataInstance = currentWhitelistInstance ? await 
    this.metadataService.findOne({'id_form': currentWhitelistInstance?.id_form}) : await this.metadataService.create(createWhitelistDto.metadata);
      await Promise.all(bsnInstances.map(async (bsnInstance) => {
          const bsn = bsnInstance
          const currentBundle = await this.whitelistsRepository.findOne({ where: { "aid_id": supplyAidInstance.id, "bsn_id": bsn.bsn_id } })
          const res = currentBundle || await this.whitelistsRepository.create({
            aid_id: supplyAidInstance.id,
            bsn_id: bsn.bsn_id,
            id_form: metadataInstance.id_form ?? null
          });
          return res;
      }));
  }

  async createWlFromFileData(createWhitelistDto: any) {
    return 'This action adds a new whitelist';
  }

  async findAll(options?: any) {
    return this.whitelistsRepository.findAll(options)
  }

  async getAllWhitelists(options?: any) {
    try {
      const distinctsAids = await this.supplyAidService.findAll({
        attributes: ['aid', 'id'],
        raw: true
      })
      const whitelists = distinctsAids.map(async (aid) => {
        const result = await this.findAllByAid({ 'aid_id': aid.id });
        return result[0];
      });
      return (await Promise.all(whitelists)).filter(wl => {return wl != null });
    } catch (error) {
      throw new Error("Error while searching data. Value may not exist " + error);
    }
  }

  async findAllByAid(where: any, options?: any) {
    const bundleList = []
    try {
      const whitelist = await this.findBy(where,
        {
          include: [{
            model: SupplyAid, attributes: ['aid']
          }, {
            model: BundleStoreName, attributes: [], include: [{
              model: applicationBundle, attributes: ['bundle']
            }, {
              model: StoreNames, attributes: [], include: [{
                model: applicationName, attributes: ['name'],
              }, {
                model: applicationStore, attributes: ['store']
              }]
            }]
          }, {
            model: WhitelistMetadata
          }], raw: true, ...options
        }
      );
      return this.transformWhitelistResponse(whitelist, bundleList)
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException({msg: 'Error processing request. Data may be invalid'})
    }
  }

  async findBy(where: any, options?: any) {
    return this.findAll({ where: where, ...options })
  }

  async findOne(condition: any, options?: any) {
    return this.whitelistsRepository.findOne({ where: condition, ...options });
  }

  async update(id: number, updateWhitelistDto: UpdateWhitelistDto) {
    return `This action updates a #${id} whitelist`;
  }

  async remove(id: number) {
    return `This action removes a #${id} whitelist`;
  }

  transformWhitelistResponse(whitelist: any, bundleList: Array<any>) {
    const transformObject = (response: any, bundleList: any) => {
      response['supply_aid'] = response['supplyAid.aid']
      response['metadata'] = {
        id: response['aid_form.id_form'],
        tag: response['aid_form.tag'],
        minimum: response['aid_form.minimum'],
        maximum: response['aid_form.maximum'],
        whitelisted: response['aid_form.whitelisted'],
        type: response['aid_form.type'],
        optimized: response['aid_form.optimized'],
        notes: response['aid_form.notes'],
        enabled: response['aid_form.enabled']
      }
      response['bundleList'] = response['aid_form.whitelisted'] === 0 ? [] : bundleList;

      const propertiesToDelete = [
        'bundleStoreName.applicationBundle.bundle',
        'bundleStoreName.storeName.applicationStore.store',
        'bundleStoreName.storeName.applicationName.name',
        'supplyAid.aid',
        'aid_form.createdAt',
        'aid_form.updatedAt',
        'aid_form.id_form',
        'aid_form.whitelisted',
        'aid_form.tag',
        'aid_form.minimum',
        'aid_form.maximum',
        'aid_form.type',
        'aid_form.optimized',
        'aid_form.enabled',
        'aid_form.notes',
        'bundleStoreName.applicationBundle.id',
        'bundleStoreName.storeName.applicationStore.id',
        'bundleStoreName.storeName.applicationName.id'
      ];
      propertiesToDelete.forEach(property => delete response[property]);
      return response;
    }
    bundleList = whitelist.map((wl: any) => {
      return ({
          bundle: wl['bundleStoreName.applicationBundle.bundle'],
          store: wl['bundleStoreName.storeName.applicationStore.store'],
          name: wl["bundleStoreName.storeName.applicationName.name"]
      })
    })
    bundleList = this.filterBy(bundleList, 'bundle')
    return this.filterBy(whitelist, 'supplyAid.aid').map((wl: any) => { return transformObject(wl, bundleList) })
  }
  filterBy(array: any[], property: any) {
    const uniqueValues = new Set();
    const filterResult = array.filter((e) => {
      if (!uniqueValues.has(e[property])) {
        uniqueValues.add(e[property]);
        return true;
      }
      return false;
    });
    return filterResult;
  }
}