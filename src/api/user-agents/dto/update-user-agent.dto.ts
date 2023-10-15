import { PartialType } from '@nestjs/mapped-types';
import { CreateUserAgentDto } from './create-user-agent.dto';

export class UpdateUserAgentDto extends PartialType(CreateUserAgentDto) {}
