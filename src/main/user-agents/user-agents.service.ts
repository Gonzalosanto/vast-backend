import { Inject, Injectable } from '@nestjs/common';
import { UserAgent } from './entities/user-agent.entity';
import { Sequelize } from 'sequelize-typescript';
import { OperatingSystem } from '../operating-systems/entities/operating-system.entity';
import { OperatingSystemsService } from '../operating-systems/operating-systems.service';
import { FindOptions } from 'sequelize';

@Injectable()
export class UserAgentsService {
  constructor(@Inject('UA_REPOSITORY') private userAgentRepository: typeof UserAgent,
  private osService: OperatingSystemsService){}
  async create(userAgentBody: any) {
    try {
      const currentUserAgents = await this.findBy(userAgentBody, {raw:true})
      if(currentUserAgents.length > 0) {return currentUserAgents;}
      const record = this.userAgentRepository.build(userAgentBody);
      const updatedRecord = await this.setOperatingSystem(record)
      return updatedRecord.save();
    } catch (error) {
      console.error(error)
    }
  }

  async bulkCreate(userAgentBody: Array<any>) {
    try {
      await this.userAgentRepository.bulkCreate(userAgentBody);
    } catch (error) {
      console.error(error)      
    }
  }

  async findAll(options?: any) {
    try {
      return this.userAgentRepository.findAll(options);
    } catch (error) {
      console.error(error)
    }
  }

  async findBy(whereOptions: any, options?: object){
    return this.userAgentRepository.findAll({where: whereOptions, ...options})
  }

  async update(id: number, userAgent: UserAgent) {
    try {
      return this.userAgentRepository.update(userAgent, {where: {id: id}})
    } catch (error) {
      console.error(error)
    };
  }

  async remove(id: number) {
    try {
      return `This action removes a #${id} userAgent`;
    } catch (error) {
      console.error(error)
    }
  }

  async getRandomUas(options?: FindOptions){
    try {
      return this.userAgentRepository.findAll({attributes: ['ua'], order: Sequelize.literal('rand()'), ...options})      
    } catch (error) {
      console.error(error)
    }
  }

  async getUserAgentsByOS(os: string, options?:any){
    const operatingSystemId = await this.osService.findBy({'os': os}, {raw:true})
    const records = await this.findAll({where: {'operatingSystemId': operatingSystemId[0].id}, include:[{
      model: OperatingSystem,
      attributes: ['os']
    }], raw: true, ...options})
    return records
  }

  async setOperatingSystem(instance: UserAgent): Promise<any>{
    const operatingSystemValue =  this.getOSFromUserAgent(instance.ua);
    const osRecord = await this.osService.findBy({'os': operatingSystemValue ?? null})
    if(!osRecord) return;
    return instance.set({operatingSystemId: osRecord[0]?.id, ...instance});
  }

  //Constant: List of keywords to get OS from user agents strings
  
  private readonly userAgentsByOS = {
    "Apple": [
      "AppleTV", "AppleCoreMedia"
    ],
    "Google":[
      "Tizen"
    ],
    "Amazon":[
      "FireTV"
    ],
    "Roku":[
      "Roku"
    ],
    "Samsung":[
    ],
  }
  getOSFromUserAgent(userAgent: string):string{
    let result: string;
    for (const os in this.userAgentsByOS){
      this.userAgentsByOS[os].find((platform:any) => {
        if(userAgent.includes(platform)) {
          return result = os;
        }
      })
      if(result) {return result;}
    }
    return result;
  }

}
