import { Module } from '@nestjs/common';
import { OperatingSystemsService } from './operating-systems.service';
import { OperatingSystem } from './entities/operating-system.entity';
import { DatabaseModule } from 'src/core/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [ OperatingSystemsService,
    {
      provide: 'OS_REPOSITORY',
      useValue: OperatingSystem,
  }],
  exports: [OperatingSystemsService, {
    provide: 'OS_REPOSITORY',
    useValue: OperatingSystem,
}]
})
export class OperatingSystemsModule {}
