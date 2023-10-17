import { Module } from '@nestjs/common';
import { StoreUrlsService } from './store-urls.service';
import { DatabaseModule } from 'src/core/database.module';

@Module({
  imports:[DatabaseModule],
  providers: [StoreUrlsService, { provide:'STORE_REPOSITORY', useValue: StoreUrlsService}],
  exports: [StoreUrlsService]
})
export class StoreUrlsModule {}
