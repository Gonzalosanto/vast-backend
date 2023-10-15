import { Module } from '@nestjs/common';
import { StoreNamesService } from './store-names.service';
import { StoreNamesController } from './store-names.controller';

@Module({
  controllers: [StoreNamesController],
  providers: [StoreNamesService],
})
export class StoreNamesModule {}
