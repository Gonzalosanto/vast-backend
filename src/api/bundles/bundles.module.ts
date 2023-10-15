import { Module } from '@nestjs/common';
import { BundlesController } from './bundles.controller';
import { BundlesService } from './bundles.service';
import { bundlesProviders } from './bundles.providers';
import { DatabaseModule } from 'src/core/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [BundlesController],
  providers: [BundlesService, ...bundlesProviders],
})
export class BundleModule {}
