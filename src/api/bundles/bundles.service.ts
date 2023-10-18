import { Injectable, Inject } from '@nestjs/common';
import { applicationBundle } from './entities/bundles.entity';
import { BUNDLE_REPOSITORY } from 'src/constants';

@Injectable()
export class BundlesService {
  constructor(@Inject(BUNDLE_REPOSITORY) private bundleRepository: typeof applicationBundle){}

  async findAll(): Promise<applicationBundle[]> {
    return this.bundleRepository.findAll();
  }

  async findWhere(where: any): Promise<applicationBundle[]>{
    return this.bundleRepository.findAll(where);
  }

  async createBundle(createBundleDto: any): Promise<applicationBundle> {
    const currentBundles = await this.findWhere({where : createBundleDto})
    if(currentBundles.length > 0) return;
    return this.bundleRepository.create(createBundleDto);
  }

  async updateBundle(body: applicationBundle, options: any): Promise<any> {
    return this.bundleRepository.update(body, options);
  }

  async deleteBundle(options: any): Promise<any> {
    return this.bundleRepository.destroy(options);
  }
}
