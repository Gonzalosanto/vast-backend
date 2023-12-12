import { Module } from '@nestjs/common';
import { UserAgentsService } from './user-agents.service';
import { DatabaseModule } from 'src/core/database.module';
import { UserAgent } from './entities/user-agent.entity';
import { OperatingSystemsService } from '../operating-systems/operating-systems.service';
import { OperatingSystemsModule } from '../operating-systems/operating-systems.module';
import { UserAgentsController } from './user-agents.controller';

@Module({
  imports:[DatabaseModule, OperatingSystemsModule],
  controllers:[UserAgentsController],
  providers: [UserAgentsService, OperatingSystemsService, {provide: 'UA_REPOSITORY', useValue: UserAgent}],
  exports: [UserAgentsService],
})
export class UserAgentsModule {}
