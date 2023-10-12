import { Injectable, Inject } from '@nestjs/common';
import { applicationBundle } from './entities/bundles.entity';
import { BUNDLE_REPOSITORY } from 'src/constants';

@Injectable()
export class BundlesService {
  constructor(
    @Inject(BUNDLE_REPOSITORY)
    private bundleRepository: typeof applicationBundle,
  ) {}

  async findAll(): Promise<applicationBundle[]> {
    return this.bundleRepository.findAll();
  }

  async createBundle(body: applicationBundle): Promise<any> {
    return this.bundleRepository.create({ body });
  }

  async updateBundle(body: applicationBundle, options: any): Promise<any> {
    return this.bundleRepository.update(body, options);
  }

  async deleteBundle(options: any): Promise<any> {
    return this.bundleRepository.destroy(options);
  }
}
