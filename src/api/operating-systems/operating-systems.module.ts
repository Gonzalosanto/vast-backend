import { Module } from '@nestjs/common';
import { OperatingSystemsService } from './operating-systems.service';
import { OperatingSystemsController } from './operating-systems.controller';

@Module({
  controllers: [OperatingSystemsController],
  providers: [OperatingSystemsService],
})
export class OperatingSystemsModule {}
