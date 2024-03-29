import { Injectable, Inject } from '@nestjs/common';
import { UpdateStoreUrlDto } from './dto/update-store-url.dto';
import { applicationStore } from './entities/store-url.entity';
import { WhereOptions } from 'sequelize';
import { OperatingSystemsService } from '../operating-systems/operating-systems.service';

@Injectable()
export class StoreUrlsService {
  constructor(@Inject('STORE_REPOSITORY') private storeRepository: typeof applicationStore,
    private osService: OperatingSystemsService){}
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

  async findOne(condition: any, options?: any) {
    return this.storeRepository.findOne({where : condition, ...options});
  }

  async update(field: string, searchValue: any, valuesToUpdate: any) {
    return this.storeRepository.update(valuesToUpdate, {where: {[field] : searchValue}});
  }

  async remove(id: number) {
    return `This action removes a #${id} storeUrl`;
  }

  async getOS(storeUrl: string){
    const store = await this.storeRepository.findOne({where: {'store': storeUrl}});
    return (await this.osService.findOne(store.operatingSystemId)).os
  }
  async updateOS(os: any, options: any){
    return this.storeRepository.update({'operatingSystemId' : os}, options)
  }
}
