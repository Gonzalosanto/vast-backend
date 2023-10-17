import { Module } from '@nestjs/common';
import { BundleStoreNamesService } from './bundle-store-names.service';
import { DatabaseModule } from 'src/core/database.module';
import { BundleStoreName } from './entities/bundle-store-name.entity';

@Module({
  imports: [DatabaseModule],
  providers: [BundleStoreNamesService, {provide: 'BSN_REPOSITORY', useValue: BundleStoreName}],
  exports: [BundleStoreNamesService]
})
export class BundleStoreNamesModule {}
