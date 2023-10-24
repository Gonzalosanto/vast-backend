import { Module } from '@nestjs/common';
import { UipsService } from './uips.service';
import { Uip } from './entities/uip.entity';
import { DatabaseModule } from 'src/core/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [UipsService, {provide: 'UIP_REPOSITORY', useValue: Uip}],
  exports: [UipsService]
})
export class UipsModule {}
