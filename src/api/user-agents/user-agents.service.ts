import { Inject, Injectable } from '@nestjs/common';
import { UpdateUserAgentDto } from './dto/update-user-agent.dto';
import { UserAgent } from './entities/user-agent.entity';

@Injectable()
export class UserAgentsService {
  constructor(@Inject('UA_REPOSITORY') private userAgentRepository: typeof UserAgent){}
  async create(userAgentRecord: any) {
    const currentUserAgents = await this.findBy(userAgentRecord)
    if(currentUserAgents.length > 0) return;
    return this.userAgentRepository.create(userAgentRecord);
  }

  async findAll() {
    return this.userAgentRepository.findAll();
  }

  async findBy(whereOptions: any, options?: object){
    return this.userAgentRepository.findAll({where: whereOptions, ...options})
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
