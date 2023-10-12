import { Injectable } from '@nestjs/common';
import { CreateStoreUrlDto } from './dto/create-store-url.dto';
import { UpdateStoreUrlDto } from './dto/update-store-url.dto';

@Injectable()
export class StoreUrlsService {
  create(createStoreUrlDto: CreateStoreUrlDto) {
    return createStoreUrlDto;
  }

  findAll() {
    return `This action returns all storeUrls`;
  }

  findOne(id: number) {
    return `This action returns a #${id} storeUrl`;
  }

  update(id: number, updateStoreUrlDto: UpdateStoreUrlDto) {
    return `This action updates a #${id} storeUrl ${updateStoreUrlDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} storeUrl`;
  }
}
