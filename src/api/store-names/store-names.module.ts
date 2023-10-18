import { Module } from '@nestjs/common';
import { StoreNamesService } from './store-names.service';
import { StoreNamesController } from './store-names.controller';
import { DatabaseModule } from 'src/core/database.module';
import { StoreNames } from './entities/store-name.entity';

@Module({
  imports:[DatabaseModule],
  controllers: [StoreNamesController],
  providers: [StoreNamesService, {provide: 'SN_REPOSITORY', useValue: StoreNames}],
  exports: [StoreNamesService]
})
export class StoreNamesModule {}
