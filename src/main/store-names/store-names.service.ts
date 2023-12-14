import { Inject, Injectable } from '@nestjs/common';
import { UpdateStoreNameDto } from './dto/update-store-name.dto';
import { StoreNames } from './entities/store-name.entity';
import { applicationStore } from '../store-urls/entities/store-url.entity';
import { applicationName } from '../names/entities/name.entity';
import { Op } from 'sequelize';

@Injectable()
export class StoreNamesService {
  constructor(
    @Inject('SN_REPOSITORY') private storeNameRepository: typeof StoreNames,
  ) {}
  async create(storeNameObject: any) {
    try {
      const currentStoreNames = await this.findBy(
        {
          [Op.and]: [
            {
              applicationNameId:
                storeNameObject.applicationNameId,
            },
            {
              applicationStoreId:
                storeNameObject.applicationStoreId,
            },
          ],
        },
        {},
      );
      if (currentStoreNames.length > 0) return currentStoreNames;
      return this.storeNameRepository.create({applicationNameId: storeNameObject.applicationNameId, applicationStoreId: storeNameObject.applicationStoreId});
    } catch (error) {
      console.log(error);
    }
  }

  async findAll() {
    return this.storeNameRepository.findAll({
      include: [
        { model: applicationStore, attributes: ['store'] },
        { model: applicationName, attributes: ['name'] },
      ],raw: true});
  }

  async findBy(where: any, options?: any) {
    return this.storeNameRepository.findAll({ where: where, ...options });
  }

  async findOne(where: any, options?: any) {
    return this.storeNameRepository.findOne({where: where,
      include: [{
        model: applicationName, attributes: ['name']
      },
      {
        model: applicationStore, attributes: ['store']
      }], ...options});
  }

  update(id: number, updateStoreNameDto: UpdateStoreNameDto) {
    return `This action updates a #${id} storeName with ${updateStoreNameDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} storeName`;
  }
}
