import { Inject, Injectable } from '@nestjs/common';
import { CreateBundleStoreNameDto } from './dto/create-bundle-store-name.dto';
import { UpdateBundleStoreNameDto } from './dto/update-bundle-store-name.dto';
import { BundleStoreName } from './entities/bundle-store-name.entity';
import { applicationStore } from '../store-urls/entities/store-url.entity';
import { applicationName } from '../names/entities/name.entity';
import { applicationBundle } from '../bundles/entities/bundles.entity';
import { StoreNames } from '../store-names/entities/store-name.entity';

@Injectable()
export class BundleStoreNamesService {
  constructor(
    @Inject('BSN_REPOSITORY')
    private bundleStoreNameRepository: typeof BundleStoreName,
  ) {}
  create(createBundleStoreNameDto: CreateBundleStoreNameDto) {
    return this.bundleStoreNameRepository.create({ createBundleStoreNameDto });
  }

  async findAll(): Promise<BundleStoreName[]> {
    const resolve = await this.bundleStoreNameRepository.findAll({
      include: [
        { model: applicationBundle, attributes: ['bundle'] },
        { model: StoreNames, include: [
          { model: applicationStore, attributes: ['store'] },
          { model: applicationName, attributes: ['name'] },
        ] },
      ],
      raw: true,
    });
    return resolve;
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
