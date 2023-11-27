import { Module } from '@nestjs/common';
import { WhitelistsService } from './whitelists.service';
import { WhitelistsController } from './whitelists.controller';
import { AidsModule } from '../aids/aids.module';
import { BundleStoreNamesModule } from '../bundle-store-names/bundle-store-names.module';
import { Whitelist } from './entities/whitelist.entity';
import { AidFormsModule } from '../aid_forms/aid_forms.module';


@Module({
  imports: [AidsModule,BundleStoreNamesModule,AidFormsModule],
  controllers: [WhitelistsController],
  providers: [WhitelistsService, {provide: 'WLS_REPOSITORY', useValue: Whitelist}],
  exports: [WhitelistsService]
})
export class WhitelistsModule {}
