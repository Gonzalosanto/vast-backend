import { Injectable, Inject } from '@nestjs/common';
import { CreateStoreUrlDto } from './dto/create-store-url.dto';
import { UpdateStoreUrlDto } from './dto/update-store-url.dto';
import { applicationStore } from './entities/store-url.entity';

@Injectable()
export class StoreUrlsService {
  constructor(@Inject('STORE_REPOSITORY') private storeRepository: typeof applicationStore){}
  create(createStoreUrlDto: CreateStoreUrlDto) {
    return this.storeRepository.create();
  }

  findAll() {
    return this.storeRepository.findAll();
  }

  findOne(id: number) {
    return this.storeRepository.findAll();
  }

  update(id: number, updateStoreUrlDto: UpdateStoreUrlDto) {
    return `This action updates a #${id} storeUrl ${updateStoreUrlDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} storeUrl`;
  }
}
