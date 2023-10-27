import { Module } from '@nestjs/common';
import { StoreUrlsService } from './store-urls.service';
import { DatabaseModule } from 'src/core/database.module';
import { applicationStore } from './entities/store-url.entity';

@Module({
  imports:[DatabaseModule],
  providers: [StoreUrlsService, { provide:'STORE_REPOSITORY', useValue: applicationStore}],
  exports: [StoreUrlsService]
})
export class StoreUrlsModule {}
