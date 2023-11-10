import { Module } from '@nestjs/common';
import { BundlesService } from './bundles.service';
import { bundlesProviders } from './bundles.providers';
import { DatabaseModule } from 'src/core/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [BundlesService, ...bundlesProviders],
  exports: [BundlesService]
})
export class BundleModule {}
