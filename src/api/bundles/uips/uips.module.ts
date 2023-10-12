import { Module } from '@nestjs/common';
import { UipsService } from './uips.service';
import { UipsController } from './uips.controller';

@Module({
  controllers: [UipsController],
  providers: [UipsService],
})
export class UipsModule {}
