import { Inject, Injectable } from '@nestjs/common';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { DeviceId } from './entities/device.entity';

@Injectable()
export class DevicesService {
  constructor(@Inject('DEVICE_REPOSITORY') private devicesRepository: typeof DeviceId){}
  create(createDeviceDto: CreateDeviceDto) {
    return this.devicesRepository.create({createDeviceDto});
  }

  findAll() {
    return this.devicesRepository.findAll();
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
