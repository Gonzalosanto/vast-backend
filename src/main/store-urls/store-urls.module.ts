import { Module } from '@nestjs/common';
import { StoreUrlsService } from './store-urls.service';
import { DatabaseModule } from 'src/core/database.module';
import { applicationStore } from './entities/store-url.entity';
import { OperatingSystemsService } from '../operating-systems/operating-systems.service';
import { OperatingSystemsModule } from '../operating-systems/operating-systems.module';

@Module({
  imports:[DatabaseModule, OperatingSystemsModule],
  providers: [StoreUrlsService, OperatingSystemsService, { provide:'STORE_REPOSITORY', useValue: applicationStore}],
  exports: [StoreUrlsService, OperatingSystemsService]
})
export class StoreUrlsModule {}
