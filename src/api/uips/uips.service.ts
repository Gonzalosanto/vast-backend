import { Inject, Injectable } from '@nestjs/common';
import { UpdateUipDto } from './dto/update-uip.dto';
import { Uip } from './entities/uip.entity';

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
