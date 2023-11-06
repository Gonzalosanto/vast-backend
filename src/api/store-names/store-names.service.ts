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
                storeNameObject.applicationNameId[0].dataValues.id,
            },
            {
              applicationStoreId:
                storeNameObject.applicationStoreId[0].dataValues.id,
            },
          ],
        },
        {},
      );
      if (currentStoreNames.length > 0) return currentStoreNames;
      const storeNameInstance = await this.storeNameRepository.create({
        applicationNameId: storeNameObject.applicationNameId[0].dataValues.id,
        applicationStoreId: storeNameObject.applicationStoreId[0].dataValues.id,
      });
      return storeNameInstance;
    } catch (error) {
      console.log(error);
    }
  }

  async findAll() {
    return this.storeNameRepository.findAll({
      attributes:[],
      include: [
        { model: applicationStore, attributes: ['store'] },
        { model: applicationName, attributes: ['name'] },
      ],
    });
  }

  async findBy(where: any, options: any) {
    return this.storeNameRepository.findAll({ where: where, ...options });
  }

  findOne(id: number) {
    return `This action returns a #${id} storeName`;
  }

  update(id: number, updateStoreNameDto: UpdateStoreNameDto) {
    return `This action updates a #${id} storeName with ${updateStoreNameDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} storeName`;
  }
}
