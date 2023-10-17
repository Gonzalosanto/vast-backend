import { Inject, Injectable } from '@nestjs/common';
import { CreateUipDto } from './dto/create-uip.dto';
import { UpdateUipDto } from './dto/update-uip.dto';
import { Uip } from './entities/uip.entity';

@Injectable()
export class UipsService {
  constructor(@Inject('UIP_REPOSITORY') private uipRepository: typeof Uip){}
  create(createUipDto: CreateUipDto) {
    return this.uipRepository.create();
  }

  findAll() {
    return this.uipRepository.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} uip`;
  }

  update(id: number, updateUipDto: UpdateUipDto) {
    return `This action updates a #${id} uip ${updateUipDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} uip`;
  }
}
