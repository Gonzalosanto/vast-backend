import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserAgentsService } from './user-agents.service';
import { CreateUserAgentDto } from './dto/create-user-agent.dto';
import { UpdateUserAgentDto } from './dto/update-user-agent.dto';

@Controller('user-agents')
export class UserAgentsController {
  constructor(private readonly userAgentsService: UserAgentsService) {}

  @Post()
  create(@Body() createUserAgentDto: CreateUserAgentDto) {
    return this.userAgentsService.create(createUserAgentDto);
  }

  @Get()
  findAll() {
    return this.userAgentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userAgentsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserAgentDto: UpdateUserAgentDto,
  ) {
    return this.userAgentsService.update(+id, updateUserAgentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userAgentsService.remove(+id);
  }
}
