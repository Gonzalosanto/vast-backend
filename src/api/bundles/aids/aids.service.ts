import { Injectable } from '@nestjs/common';
import { CreateAidDto } from './dto/create-aid.dto';
import { UpdateAidDto } from './dto/update-aid.dto';

@Injectable()
export class AidsService {
  create(createAidDto: CreateAidDto) {
    return createAidDto;
  }

  findAll() {
    return `This action returns all aids`;
  }

  findOne(id: number) {
    return `This action returns a #${id} aid`;
  }

  update(id: number, updateAidDto: UpdateAidDto) {
    return `This action updates a #${id} aid and their values with ${updateAidDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} aid`;
  }
}
