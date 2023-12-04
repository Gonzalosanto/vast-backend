import { Module } from '@nestjs/common';
import { AidsService } from './aids.service';
import { AidsController } from './aids.controller';
import { SupplyAid } from './entities/supply-aid.entity';

@Module({
  controllers: [AidsController],
  providers: [AidsService, { provide: 'AID_REPOSITORY', useValue: SupplyAid }],
  exports: [AidsService],
})
export class AidsModule {}
