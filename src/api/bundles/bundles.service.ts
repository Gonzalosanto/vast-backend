import { Injectable, Inject } from '@nestjs/common';
import { applicationBundle } from './entities/bundles.entity';
import { BUNDLE_REPOSITORY } from 'src/constants';

@Injectable()
export class BundlesService {
  constructor(@Inject(BUNDLE_REPOSITORY) private bundleRepository: typeof applicationBundle){}

  async findAll(): Promise<applicationBundle[]> {
    return this.bundleRepository.findAll();
  }

  async findBy(whereOptions: any, options: any): Promise<applicationBundle[]>{
    return this.bundleRepository.findAll({where: whereOptions, ...options});
  }

  async findOne(where: any, options?:any){
    return this.bundleRepository.findOne({where: where, ...options})
  }

  async createBundle(createBundleDto: any): Promise<applicationBundle[] | applicationBundle>  {
    const currentBundles = await this.findBy(createBundleDto, {})
    if(currentBundles.length > 0) return currentBundles;
    return this.bundleRepository.create(createBundleDto);
  }

  async updateBundle(body: applicationBundle, options: any): Promise<any> {
    return this.bundleRepository.update(body, options);
  }

  async deleteBundle(options: any): Promise<any> {
    return this.bundleRepository.destroy(options);
  }
}
