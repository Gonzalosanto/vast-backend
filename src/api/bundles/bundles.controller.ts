import { Get, Controller, Put, Post, Delete } from '@nestjs/common';
import { BundlesService } from './bundles.service';
import { applicationBundle } from './entities/bundles.entity';
@Controller('bundles')
export class BundlesController {
  constructor(private bundleService: BundlesService) {}
  @Get()
  async getBundles() {
    return this.bundleService.findAll();
  }

  @Post()
  async createBundle(body: applicationBundle) {
    return this.bundleService.createBundle(body);
  }
  @Put()
  async updateBundles(body: applicationBundle, options: any) {
    return this.bundleService.updateBundle(body, options);
  }
  @Delete()
  async deleteBundles(options: any) {
    return this.bundleService.deleteBundle(options);
  }
}
