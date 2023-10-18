import { Injectable, Inject } from '@nestjs/common';
import { CreateStoreUrlDto } from './dto/create-store-url.dto';
import { UpdateStoreUrlDto } from './dto/update-store-url.dto';
import { applicationStore } from './entities/store-url.entity';

@Injectable()
export class StoreUrlsService {
  constructor(@Inject('STORE_REPOSITORY') private storeRepository: typeof applicationStore){}
  async create(createStoreUrlDto: any) {
    const currentStores = await this.findAll(createStoreUrlDto);
    if(currentStores.length > 0) return;
    return this.storeRepository.create(createStoreUrlDto);
  }

  async findAll(where?: any) {
    return this.storeRepository.findAll(where ?? {});
  }

  async findOne(id: number) {
    return this.storeRepository.findAll();
  }

  async update(id: number, updateStoreUrlDto: UpdateStoreUrlDto) {
    return `This action updates a #${id} storeUrl ${updateStoreUrlDto}`;
  }

  async remove(id: number) {
    return `This action removes a #${id} storeUrl`;
  }
}
