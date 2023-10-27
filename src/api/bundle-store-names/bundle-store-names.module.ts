import { Module } from '@nestjs/common';
import { BundleStoreNamesService } from './bundle-store-names.service';
import { DatabaseModule } from 'src/core/database.module';
import { BundleStoreName } from './entities/bundle-store-name.entity';
import { StoreUrlsModule } from '../store-urls/store-urls.module';
import { OperatingSystemsModule } from '../operating-systems/operating-systems.module';
import { NamesModule } from '../names/names.module';
import { BundleModule } from '../bundles/bundles.module';
import { StoreNamesModule } from '../store-names/store-names.module';

@Module({
  imports: [DatabaseModule,OperatingSystemsModule,StoreUrlsModule, NamesModule, BundleModule, StoreNamesModule],
  providers: [BundleStoreNamesService, {provide: 'BSN_REPOSITORY', useValue: BundleStoreName}],
  exports: [BundleStoreNamesService]
})
export class BundleStoreNamesModule {}
