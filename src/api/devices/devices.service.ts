import { Inject, Injectable } from '@nestjs/common';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { DeviceId } from './entities/device.entity';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class DevicesService {
  constructor(@Inject('DEVICE_REPOSITORY') private devicesRepository: typeof DeviceId){}
  async create(deviceIdRecord: any) {
    const currentDeviceIds = await this.findBy(deviceIdRecord)
    if(currentDeviceIds.includes(deviceIdRecord)) return currentDeviceIds;
    return this.devicesRepository.create({deviceIdRecord});
  }

  async bulkCreate(userIPRecords: Array<any>){
    return this.devicesRepository.bulkCreate(userIPRecords)
  }

  async findAll() {
    return this.devicesRepository.findAll();
  }

  async findBy(whereOptions: any, options?: object){
    return this.devicesRepository.findAll({where: whereOptions, ...options})
  }

  async findOne(id: number){
    return this.devicesRepository.findByPk(id);
  }

  async getRandomDevices(limit: number){
    return this.devicesRepository.findAll({attributes: ['deviceid'], order: Sequelize.literal('rand()'), limit: limit, raw: true})
  }

  update(id: number, updateDeviceDto: UpdateDeviceDto) {
    return `This action updates a #${id} device with ${updateDeviceDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} device`;
  }
}
