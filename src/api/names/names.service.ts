import { Injectable } from '@nestjs/common';
import { CreateNameDto } from './dto/create-name.dto';
import { UpdateNameDto } from './dto/update-name.dto';

@Injectable()
export class NamesService {
  create(createNameDto: CreateNameDto) {
    return createNameDto;
  }

  findAll() {
    return `This action returns all names`;
  }

  findOne(id: number) {
    return `This action returns a #${id} name`;
  }

  update(id: number, updateNameDto: UpdateNameDto) {
    return `This action updates a #${id} name with ${updateNameDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} name`;
  }
}
