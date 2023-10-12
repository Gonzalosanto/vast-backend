import { Module } from '@nestjs/common';
import { BundleStoreNamesService } from './bundle-store-names.service';
import { BundleStoreNamesController } from './bundle-store-names.controller';

@Module({
  controllers: [BundleStoreNamesController],
  providers: [BundleStoreNamesService],
})
export class BundleStoreNamesModule {}
