import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/core/database.module';
import { MacrosController } from './macros.controller';
import { MacrosService } from './macros.service';
import { BundleStoreNamesModule } from 'src/api/bundle-store-names/bundle-store-names.module';
import { BundleModule } from 'src/api/bundles/bundles.module';
import { NamesModule } from 'src/api/names/names.module';
import { OperatingSystemsModule } from 'src/api/operating-systems/operating-systems.module';
import { UserAgentsModule } from 'src/api/user-agents/user-agents.module';
import { DevicesModule } from 'src/api/devices/devices.module';
import { StoreUrlsModule } from 'src/api/store-urls/store-urls.module';
import { UipsModule } from 'src/api/uips/uips.module';
import { StoreNamesModule } from 'src/api/store-names/store-names.module';
@Module({
  imports:[
    DatabaseModule, 
    OperatingSystemsModule, 
    StoreUrlsModule, 
    UserAgentsModule,
    UipsModule, 
    DevicesModule, 
    BundleStoreNamesModule,
    StoreNamesModule, 
    BundleModule,
    NamesModule
  ],
  controllers:[MacrosController],
  providers: [MacrosService],
  exports: [MacrosService]
})
export class MacrosModule {}