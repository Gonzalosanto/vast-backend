import { Module } from '@nestjs/common';
import { NamesService } from './names.service';
import { DatabaseModule } from 'src/core/database.module';
import { applicationName } from './entities/name.entity';

@Module({
  imports: [DatabaseModule],
  providers: [NamesService, {provide: 'NAME_REPOSITORY', useValue: applicationName}],
  exports: [NamesService]
})
export class NamesModule {}
