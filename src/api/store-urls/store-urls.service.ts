import { Injectable, Inject } from '@nestjs/common';
import { UpdateStoreUrlDto } from './dto/update-store-url.dto';
import { applicationStore } from './entities/store-url.entity';
import { WhereOptions } from 'sequelize';

@Injectable()
export class StoreUrlsService {
  constructor(@Inject('STORE_REPOSITORY') private storeRepository: typeof applicationStore){}
  async create(createStoreUrlDto: any) {
    const currentStores = await this.findBy(createStoreUrlDto);
    if(currentStores.length > 0) return currentStores;
    return this.storeRepository.create(createStoreUrlDto);
  }

  async findBy(lookup: WhereOptions, options?: any){
    return this.storeRepository.findAll({where: lookup, ...options})
  }

  async findAll() {
    return this.storeRepository.findAll();
  }

  async findOne(id: number) {
    return this.storeRepository.findOne({where : {id: id}});
  }

  async update(field: string, searchValue: any, valuesToUpdate: any) {
    return this.storeRepository.update(valuesToUpdate, {where: {[field] : searchValue}});
  }

  async remove(id: number) {
    return `This action removes a #${id} storeUrl`;
  }
}
