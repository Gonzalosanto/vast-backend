import { Injectable } from '@nestjs/common';
import { CreateBundleStoreNameDto } from './dto/create-bundle-store-name.dto';
import { UpdateBundleStoreNameDto } from './dto/update-bundle-store-name.dto';

@Injectable()
export class BundleStoreNamesService {
  create(createBundleStoreNameDto: CreateBundleStoreNameDto) {
    return createBundleStoreNameDto;
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
