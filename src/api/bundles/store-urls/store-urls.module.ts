import { Module } from '@nestjs/common';
import { StoreUrlsService } from './store-urls.service';
import { StoreUrlsController } from './store-urls.controller';

@Module({
  controllers: [StoreUrlsController],
  providers: [StoreUrlsService],
})
export class StoreUrlsModule {}
