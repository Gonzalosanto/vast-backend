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
    if(createWhitelistDto.bundleList.length === 0){
      bsnInstances = await this.bundleStoreNameService.findAll();
    }else{
       bsnInstances = await Promise.all(createWhitelistDto.bundleList.map(async (b,i) => {
        const bundleInstanceId = (await this.bundleService.findOne({ "bundle": b.bundle }))?.id;
        const nameInstanceId = (await this.nameService.findOne({ "name": b.name }))?.id;
        const storeInstanceId = (await this.storeService.findOne({ "store": b.store }))?.id;
        if(!bundleInstanceId)throw new BadRequestException("Combination "+ (i+1)+" has this error:"+ " Bundle not found "+ b.bundle) 
        if(!nameInstanceId) throw new BadRequestException("Combination "+ (i+1)+" has this error:"+ " Name not found "+ b.name) 
        if(!storeInstanceId)throw new BadRequestException("Combination "+ (i+1)+" has this error:"+ "Store "+ b.store)

        const storeNameInstanceId = (await this.storeNameService.findBy({ "applicationStoreId": storeInstanceId, "applicationNameId": nameInstanceId }))[0].sn_id
        return this.bundleStoreNameService.findBy({
          [Op.and]: [
            { 'applicationBundleId': bundleInstanceId },
            { 'storeNameId': storeNameInstanceId }
          ],
        })[0];
      }));
    } 
    const existingSupplyAid = await this.supplyAidService.findOne({ aid: createWhitelistDto.supply_aid });
    const supplyAidInstance = existingSupplyAid ?? (await this.supplyAidService.create({ supply_aid: createWhitelistDto.supply_aid }));

    const currentWhitelistInstance = await this.findOne({'aid_id': supplyAidInstance.id}, {raw: true});
    const metadataInstance = currentWhitelistInstance ? await this.metadataService.findOne({'id_form': currentWhitelistInstance?.id_form}) : await this.metadataService.create(createWhitelistDto.metadata);
      await Promise.all(bsnInstances.map(async (bsnInstance) => {
        console.log(bsnInstance);
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

  async update(aid: number, updateWhitelistDto: UpdateWhitelistDto) {
    let errors = [];
    async function validateBundleList(list: Array<any>){
      const isValidList = list.reduce( async (accumulator:any, elem: any) => {
        const foundBundle = await this.bundleService.findOne({'bundle': elem.bundle});
        const foundName = await this.nameService.findOne({'name': elem.name});
        const foundStore = await this.storeService.findOne({'store': elem.store});
        return accumulator && (foundBundle != null && foundName != null && foundStore != null)
      }, true)
      return isValidList;
    }
    if(updateWhitelistDto.bundleList == undefined || updateWhitelistDto.bundleList.length == 0) throw new BadRequestException({message:"Could not update any values", type: "ERROR"});
    //If bundleList is empty whitelisted = false _> update to every bundleNameStore 
    const aid_id = (await this.supplyAidService.findOne({"aid":aid}))?.id;
    if(!aid_id) throw new BadRequestException({message: "Invalid parameter value", type: "ERROR"})
    const existingWhitelist = await this.findAllByAid({'aid_id': aid_id});
    const isValidBundleList = await validateBundleList(updateWhitelistDto.bundleList)
    if(!isValidBundleList) throw new BadRequestException(errors)

    if(!existingWhitelist[0].metadata.whitelisted){console.log('Removes current whitelist to add a new whitelist')}
    this.whitelistsRepository.create()
    //MISSING VALUES: selected items to update
    updateWhitelistDto.bundleList.forEach(async (bundle) => {
      console.log(bundle)
      //const bsn_id = this.bundleStoreName.findOne(bsn_id:bundle.id).id
      //return this.whitelistsRepository.update({'bsn_id' : 1}, {where: {'bsn_id': previous_bsn_id}}) //Look up by old value
    })
    await this.metadataService.update(existingWhitelist[0].metadata, updateWhitelistDto.metadata);
    //If whitelisted, remove every old bsn reference, change isWhitelisted to true, add new bundleList
    
    return "kajsdhjkasd";
  }

  async remove(aid: number) {
    const supplyAidID = await this.supplyAidService.findOne({'aid': aid})
    const whitelistToDestroy = await this.whitelistsRepository.findOne({where: {'aid_id': supplyAidID.id}})
    await this.metadataService.remove(whitelistToDestroy.id_form)
    return this.whitelistsRepository.destroy({where: {'aid_id': supplyAidID.id}});
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
        notes: response['aid_form.notes'],
        whitelisted: response["aid_form.whitelisted"],
        enabled: response['aid_form.enabled']
      }
      response['bundleList'] = bundleList

      delete (response['bundleStoreName.applicationBundle.id'])
      delete (response['bundleStoreName.applicationBundle.bundle'])
      delete (response['bundleStoreName.storeName.applicationName.id'])
      delete (response['bundleStoreName.storeName.applicationName.name'])
      delete (response['bundleStoreName.storeName.applicationStore.id'])
      delete (response['bundleStoreName.storeName.applicationStore.store'])
      delete (response['supplyAid.aid'])
      delete (response['aid_form.crea tedAt'])
      delete (response['aid_form.id_form'])
      delete (response['aid_form.tag'])
      delete (response['aid_form.minimum'])
      delete (response['aid_form.maximum'])
      delete (response['aid_form.type'])
      delete (response['aid_form.optimized'])
      delete (response['aid_form.enabled'])
      delete (response['aid_form.notes'])
      delete (response['aid_form.createdAt'])
      delete (response['aid_form.updatedAt'])
      delete(response["aid_form.whitelisted"])

      return response
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