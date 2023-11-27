import { Inject, Injectable } from '@nestjs/common';
import { CreateWhitelistDto } from './dto/create-whitelist.dto';
import { UpdateWhitelistDto } from './dto/update-whitelist.dto';
import { Whitelist } from './entities/whitelist.entity';
import { AidsService } from '../aids/aids.service';
import { BundleStoreNamesService, StoreNamesService } from '..';
import { CreateBundleStoreNameDto } from '../bundle-store-names/dto/create-bundle-store-name.dto';
import { AidFormsService } from '../aid_forms/aid_forms.service';
import { Op } from 'sequelize';

@Injectable()
export class WhitelistsService {
  constructor(
    @Inject('WLS_REPOSITORY') private whitelistsRepository: typeof Whitelist,
    private suplyAidService: AidsService,
    private bundleStoreNameService: BundleStoreNamesService,
    private formAidService: AidFormsService,
  ) {}

  async create(createWhitelistDto: any) {
    const existingSupplyAid = await this.suplyAidService.findOne({
      aid: createWhitelistDto.aid
    });
    if (existingSupplyAid) {
      throw new Error('El aid ya existe en la base de datos.');
    }

    const supplyAidInstance = await this.suplyAidService.create(
      createWhitelistDto.aid
    );

    const aidFormInstance = await this.formAidService.create(
      createWhitelistDto.aid_forn,
    );

    const bsnInstance = await this.bundleStoreNameService.findOne({
      [Op.and]: [
        { applicationBundleId: createWhitelistDto.bundle },
        { storeNameId: createWhitelistDto.storeName },
      ],
    });
    console.log(bsnInstance.bsn_id);
    if (bsnInstance) {
      return this.whitelistsRepository.create({
        supplyAidInstance,
        aidFormInstance,
        bsnInstance,
      });
    } else {
      throw new Error('No existe esta combinación en la base de datos');
    }
  }

  async createWlFromFileData(createWhitelistDto: any) {
    return 'This action adds a new whitelist';
  }

  async findAll(options?: any) {
    return this.whitelistsRepository.findAll({ ...options });
  }

  async findOne(id: number) {
    return `This action returns a #${id} whitelist`;
  }

  async update(id: number, updateWhitelistDto: UpdateWhitelistDto) {
    return `This action updates a #${id} whitelist`;
  }

  async remove(id: number) {
    return `This action removes a #${id} whitelist`;
  }
  async removeAll() {
    return `This action removes a whitelists`;
  }
}
