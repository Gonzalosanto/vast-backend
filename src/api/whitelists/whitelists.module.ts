import { Module } from '@nestjs/common';
import { WhitelistsService } from './whitelists.service';
import { WhitelistsController } from './whitelists.controller';
import { AidsModule } from '../../main/aids/aids.module';
import { BundleStoreNamesModule } from '../../main/bundle-store-names/bundle-store-names.module';
import { Whitelist } from './entities/whitelist.entity';
import { AidFormsModule } from '../whitelist_metadata/whitelist_metadata.module';
import { BundleModule } from '../../main/bundles/bundles.module';
import { NamesModule } from '../../main/names/names.module';
import { StoreNamesModule } from '../../main/store-names/store-names.module';
import { StoreUrlsModule } from '../../main/store-urls/store-urls.module';


@Module({
  imports: [AidsModule,BundleStoreNamesModule,AidFormsModule, BundleModule, NamesModule, StoreUrlsModule ,StoreNamesModule],
  controllers: [WhitelistsController],
  providers: [WhitelistsService, {provide: 'WLS_REPOSITORY', useValue: Whitelist}],
  exports: [WhitelistsService]
})
export class WhitelistsModule {}
