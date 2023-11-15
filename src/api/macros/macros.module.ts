import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/core/database.module';
import { MacrosController } from './macros.controller';
import { MacrosService } from './macros.service';
import { BundleStoreNamesModule } from 'src/main/bundle-store-names/bundle-store-names.module';
import { BundleModule } from 'src/main/bundles/bundles.module';
import { NamesModule } from 'src/main/names/names.module';
import { OperatingSystemsModule } from 'src/main/operating-systems/operating-systems.module';
import { UserAgentsModule } from 'src/main/user-agents/user-agents.module';
import { DevicesModule } from 'src/main/devices/devices.module';
import { StoreUrlsModule } from 'src/main/store-urls/store-urls.module';
import { UipsModule } from 'src/main/uips/uips.module';
import { StoreNamesModule } from 'src/main/store-names/store-names.module';
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