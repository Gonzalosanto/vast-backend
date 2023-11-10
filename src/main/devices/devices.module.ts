import { Module } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { DatabaseModule } from 'src/core/database.module';
import { DeviceId } from './entities/device.entity';

@Module({
  imports: [DatabaseModule],
  providers: [DevicesService, {provide: 'DEVICE_REPOSITORY', useValue: DeviceId}],
  exports: [DevicesService]
})
export class DevicesModule {}
