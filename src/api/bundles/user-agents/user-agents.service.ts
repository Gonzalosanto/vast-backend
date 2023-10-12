import { Injectable } from '@nestjs/common';
import { CreateUserAgentDto } from './dto/create-user-agent.dto';
import { UpdateUserAgentDto } from './dto/update-user-agent.dto';

@Injectable()
export class UserAgentsService {
  create(createUserAgentDto: CreateUserAgentDto) {
    return createUserAgentDto;
  }

  findAll() {
    return `This action returns all userAgents`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userAgent`;
  }

  update(id: number, updateUserAgentDto: UpdateUserAgentDto) {
    return `This action updates a #${id} userAgent with ${updateUserAgentDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} userAgent`;
  }
}
