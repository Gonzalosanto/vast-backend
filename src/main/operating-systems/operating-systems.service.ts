import { Injectable, Inject } from '@nestjs/common';
import {} from 'sequelize-typescript'
import { CreateOperatingSystemDto } from './dto/create-operating-system.dto';
import { UpdateOperatingSystemDto } from './dto/update-operating-system.dto';
import { OperatingSystem } from './entities/operating-system.entity';

@Injectable()
export class OperatingSystemsService {
  constructor(@Inject('OS_REPOSITORY') private operatingSystem: typeof OperatingSystem){}
  async create(createOperatingSystemDto: any) {
    const currentOperatingSystem = await this.findBy(createOperatingSystemDto)
    if(currentOperatingSystem.length > 0) return currentOperatingSystem;
    return this.operatingSystem.create(createOperatingSystemDto);
  }

  async findAll(options?: any) {
    return this.operatingSystem.findAll(options);
  }

  async findBy(where: any, options?: object): Promise<any> {
    return this.operatingSystem.findAll({where: where, ...options});
  }

  async findOne(id: number) {
    return this.operatingSystem.findOne({where: {'id': id}});
  }

  async update(id: number, updateOperatingSystemDto: UpdateOperatingSystemDto) {
    return `This action updates a #${id} operatingSystem ${updateOperatingSystemDto}`;
  }

  async remove(id: number) {
    return `This action removes a #${id} operatingSystem`;
  }
}
