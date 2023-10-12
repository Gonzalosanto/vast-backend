import { Injectable } from '@nestjs/common';
import { CreateUipDto } from './dto/create-uip.dto';
import { UpdateUipDto } from './dto/update-uip.dto';

@Injectable()
export class UipsService {
  create(createUipDto: CreateUipDto) {
    return createUipDto;
  }

  findAll() {
    return `This action returns all uips`;
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
