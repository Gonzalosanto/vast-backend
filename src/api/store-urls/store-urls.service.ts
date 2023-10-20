import { Injectable, Inject } from '@nestjs/common';
import { UpdateStoreUrlDto } from './dto/update-store-url.dto';
import { applicationStore } from './entities/store-url.entity';

@Injectable()
export class StoreUrlsService {
  constructor(@Inject('STORE_REPOSITORY') private storeRepository: typeof applicationStore){}
  async create(createStoreUrlDto: any) {
    const currentStores = await this.findBy({where : createStoreUrlDto});
    if(currentStores.length > 0) return;
    return this.storeRepository.create(createStoreUrlDto);
  }

  async findBy(lookup: any){
    return this.storeRepository.findAll(lookup)
  }

  async findAll() {
    return this.storeRepository.findAll();
  }

  async findOne(id: number) {
    return this.storeRepository.findOne({where : {id: id}});
  }

  async update(field: any, value: any, valuesToUpdate: any) {
    return this.storeRepository.update(valuesToUpdate, {where: {[field] : value}});
  }

  async remove(id: number) {
    return `This action removes a #${id} storeUrl`;
  }
}
