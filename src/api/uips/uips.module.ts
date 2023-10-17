import { Module } from '@nestjs/common';
import { UipsService } from './uips.service';
import { UipsController } from './uips.controller';
import { Uip } from './entities/uip.entity';
import { DatabaseModule } from 'src/core/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UipsController],
  providers: [UipsService, {provide: 'UIP_REPOSITORY', useValue: Uip}],
})
export class UipsModule {}
