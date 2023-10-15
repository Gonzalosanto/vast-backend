import { Injectable } from '@nestjs/common';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';

@Injectable()
export class DevicesService {
  create(createDeviceDto: CreateDeviceDto) {
    return createDeviceDto;
  }

  findAll() {
    return `This action returns all devices`;
  }

  findOne(id: number) {
    return `This action returns a #${id} device`;
  }

  update(id: number, updateDeviceDto: UpdateDeviceDto) {
    return `This action updates a #${id} device with ${updateDeviceDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} device`;
  }
}
