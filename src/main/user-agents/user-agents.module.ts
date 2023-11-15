import { Module } from '@nestjs/common';
import { UserAgentsService } from './user-agents.service';
import { DatabaseModule } from 'src/core/database.module';
import { UserAgent } from './entities/user-agent.entity';

@Module({
  imports:[DatabaseModule],
  providers: [UserAgentsService, {provide: 'UA_REPOSITORY', useValue: UserAgent}],
  exports: [UserAgentsService],
})
export class UserAgentsModule {}
