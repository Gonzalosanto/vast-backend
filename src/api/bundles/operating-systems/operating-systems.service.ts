import { Injectable } from '@nestjs/common';
import { CreateOperatingSystemDto } from './dto/create-operating-system.dto';
import { UpdateOperatingSystemDto } from './dto/update-operating-system.dto';

@Injectable()
export class OperatingSystemsService {
  create(createOperatingSystemDto: CreateOperatingSystemDto) {
    return createOperatingSystemDto;
  }

  findAll() {
    return `This action returns all operatingSystems`;
  }

  findOne(id: number) {
    return `This action returns a #${id} operatingSystem`;
  }

  update(id: number, updateOperatingSystemDto: UpdateOperatingSystemDto) {
    return `This action updates a #${id} operatingSystem ${updateOperatingSystemDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} operatingSystem`;
  }
}
