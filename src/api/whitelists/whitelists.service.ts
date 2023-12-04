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
    const existingSupplyAid = await this.supplyAidService.findOne({ aid: createWhitelistDto.supply_aid });
    const supplyAidInstance = existingSupplyAid ?? (await this.supplyAidService.create({ supply_aid: createWhitelistDto.supply_aid }));
    const currentWhitelistMetadata = await this.metadataService.findAll({ raw: true });
    if (currentWhitelistMetadata) console.log(`There is no metadata linked with WL`);
    const metadataInstance = await this.metadataService.create({});   //Creates metadata record associated with WL

    const bsnInstances = createWhitelistDto.bundleList.map(async (b) => {
      const bundleInstanceId = (await this.bundleService.findOne({ "bundle": b.bundle }))?.id;
      const nameInstanceId = (await this.nameService.findOne({ "name": b.name }))?.id;
      const storeInstanceId = (await this.storeService.findOne({ "store": b.store }))?.id;

      const storeNameInstanceId = (await this.storeNameService.findBy({ "applicationStoreId": storeInstanceId, "applicationNameId": nameInstanceId }))[0].sn_id
      return this.bundleStoreNameService.findBy({
        [Op.and]: [
          { 'applicationBundleId': bundleInstanceId },
          { 'storeNameId': storeNameInstanceId }
        ],
      });
    })
    if (bsnInstances) {
      bsnInstances.map(async (bsnInstance) => {
        try {
          const bsn = (await bsnInstance)[0]
          const currentBundle = await this.whitelistsRepository.findOne({ where: { "aid_id": supplyAidInstance.id, "bsn_id": bsn.bsn_id } })
          const res = currentBundle || await this.whitelistsRepository.create({
            aid_id: supplyAidInstance.id,
            bsn_id: bsn.bsn_id,
            id_form: metadataInstance.id ?? null
          });
          return res;
        } catch (error) {
          console.log(error)
        }
      })

    } else {
      throw new Error('No existe esta combinación en la base de datos');
    }
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
      return Promise.all(whitelists)
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
  async removeAll() {
    return `This action removes bundles in whitelist`;
  }

  transformWhitelistResponse(whitelist: any, bundleList: Array<any>) {
    const transformObject = (response: any, bundleList: any) => {

      response['supply_aid'] = response['supplyAid.aid']
      response['metadata'] = {
        id: response['aid_form.id_form'],
        tag: response['aid_form.tag'],
        minimum: response['aid_form.minimum'],
        maximum: response['aid_form.maximum'],
        type: response['aid_form.type'],
        optimized: response['aid_form.optimized'],
        whitelisted: response['aid_form.whitelisted']
      }
      response['bundleList'] = bundleList

      delete (response['bundleStoreName.applicationBundle.id'])
      delete (response['bundleStoreName.applicationBundle.bundle'])
      delete (response['bundleStoreName.storeName.applicationName.id'])
      delete (response['bundleStoreName.storeName.applicationName.name'])
      delete (response['bundleStoreName.storeName.applicationStore.id'])
      delete (response['bundleStoreName.storeName.applicationStore.store'])
      delete (response['supplyAid.aid'])
      delete (response['aid_form.createdAt'])
      delete (response['aid_form.id_form'])
      delete (response['aid_form.tag'])
      delete (response['aid_form.minimum'])
      delete (response['aid_form.maximum'])
      delete (response['aid_form.type'])
      delete (response['aid_form.optimized'])
      delete (response['aid_form.whitelisted'])
      delete (response['aid_form.createdAt'])
      delete (response['aid_form.updatedAt'])

      return response
    }
    bundleList = whitelist.map((wl: any) => {
      return ({
        bundle:
        {
          id: wl['bundleStoreName.applicationBundle.id'],
          bundle: wl['bundleStoreName.applicationBundle.bundle']
        },
        store: {
          id: wl['bundleStoreName.storeName.applicationStore.id'],
          store: wl['bundleStoreName.storeName.applicationStore.store']
        },
        name: {
          id: wl["bundleStoreName.storeName.applicationName.id"],
          name: wl["bundleStoreName.storeName.applicationName.name"]
        }
      })
    })
    bundleList = this.filterBy(bundleList, 'bundle')
    let response: any;
    const res = this.filterBy(whitelist, 'supplyAid.aid').map((wl: any) => { return transformObject(wl, bundleList) })
    return res

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