import { Inject, Injectable } from '@nestjs/common';
import { CreateStoreNameDto } from './dto/create-store-name.dto';
import { UpdateStoreNameDto } from './dto/update-store-name.dto';
import { StoreNames } from './entities/store-name.entity';

@Injectable()
export class StoreNamesService {
  constructor(@Inject('SN_REPOSITORY') private storeNameRepository: typeof StoreNames){}
  create(createStoreNameDto: CreateStoreNameDto) {
    return this.storeNameRepository.create({createStoreNameDto});
  }

  findAll() {
    return `This action returns all storeNames`;
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
