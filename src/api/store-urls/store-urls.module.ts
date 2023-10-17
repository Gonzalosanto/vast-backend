import { Module } from '@nestjs/common';
import { StoreUrlsService } from './store-urls.service';
import { DatabaseModule } from 'src/core/database.module';

@Module({
  imports:[DatabaseModule],
  // controllers: [StoreUrlsController],
  providers: [StoreUrlsService, { provide:'STORE_REPOSITORY', useValue: StoreUrlsService}],
})
export class StoreUrlsModule {}
