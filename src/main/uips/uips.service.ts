import { Inject, Injectable } from '@nestjs/common';
import { UpdateUipDto } from './dto/update-uip.dto';
import { Uip } from './entities/uip.entity';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class UipsService {
  constructor(@Inject('UIP_REPOSITORY') private uipRepository: typeof Uip){}
  async create(userIPRecord: any) {
    const currentUIP = await this.findBy(userIPRecord)
    if(currentUIP.length > 0) return;
    return this.uipRepository.create(userIPRecord);
  }

  async bulkCreate(userIPRecords: Array<any>){
    return this.uipRepository.bulkCreate(userIPRecords)
  }

  async findAll() {
    return this.uipRepository.findAll();
  }

  async getRandomUips(limit: number, options?: any){
    return this.uipRepository.findAll({attributes: ['uip'], order: Sequelize.literal('rand()'), limit: limit, raw: true})
  }

  async findBy(whereOptions: any, options?: object){
    return this.uipRepository.findAll({where: whereOptions, ...options})
  }

  async findOne(id: number){
    return this.uipRepository.findByPk(id);
  }

  update(id: number, updateUipDto: UpdateUipDto) {
    return `This action updates a #${id} uip ${updateUipDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} uip`;
  }
}
