import { Inject, Injectable } from '@nestjs/common';
import { CreateUserAgentDto } from './dto/create-user-agent.dto';
import { UpdateUserAgentDto } from './dto/update-user-agent.dto';
import { UserAgent } from './entities/user-agent.entity';

@Injectable()
export class UserAgentsService {
  constructor(@Inject('UA_REPOSITORY') private userAgentRepository: typeof UserAgent){}
  create(createUserAgentDto: CreateUserAgentDto) {
    return this.userAgentRepository.create({createUserAgentDto});
  }

  findAll() {
    return this.userAgentRepository.findAll();
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
