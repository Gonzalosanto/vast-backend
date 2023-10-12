import { Module } from '@nestjs/common';
import { UserAgentsService } from './user-agents.service';
import { UserAgentsController } from './user-agents.controller';

@Module({
  controllers: [UserAgentsController],
  providers: [UserAgentsService],
})
export class UserAgentsModule {}
