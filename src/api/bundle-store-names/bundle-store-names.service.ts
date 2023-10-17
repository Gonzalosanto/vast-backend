import { Inject, Injectable } from '@nestjs/common';
import { CreateBundleStoreNameDto } from './dto/create-bundle-store-name.dto';
import { UpdateBundleStoreNameDto } from './dto/update-bundle-store-name.dto';
import { BundleStoreName } from './entities/bundle-store-name.entity';

@Injectable()
export class BundleStoreNamesService {
  constructor(@Inject('BSN_REPOSITORY') private bundleStoreNameRepository: typeof BundleStoreName){}
  create(createBundleStoreNameDto: CreateBundleStoreNameDto) {
    return this.bundleStoreNameRepository.create({createBundleStoreNameDto});
  }

  findAll() {
    return `This action returns all bundleStoreNames`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bundleStoreName`;
  }

  update(id: number, updateBundleStoreNameDto: UpdateBundleStoreNameDto) {
    return `This action updates a #${id} bundleStoreName with ${updateBundleStoreNameDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} bundleStoreName`;
  }
}
