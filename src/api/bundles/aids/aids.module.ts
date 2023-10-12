import { Module } from '@nestjs/common';
import { AidsService } from './aids.service';
import { AidsController } from './aids.controller';

@Module({
  controllers: [AidsController],
  providers: [AidsService],
})
export class AidsModule {}
