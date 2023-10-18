import { Injectable, Inject } from '@nestjs/common';
import {} from 'sequelize-typescript'
import { CreateOperatingSystemDto } from './dto/create-operating-system.dto';
import { UpdateOperatingSystemDto } from './dto/update-operating-system.dto';
import { OperatingSystem } from './entities/operating-system.entity';

@Injectable()
export class OperatingSystemsService {
  constructor(@Inject('OS') private operatingSystem: typeof OperatingSystem){}
  async create(createOperatingSystemDto: any) {
    if((await this.findBy({where: createOperatingSystemDto})).length > 0) return;
    return this.operatingSystem.create(createOperatingSystemDto);
  }

  async findAll() {
    return this.operatingSystem.findAll();
  }

  async findBy(where: any): Promise<any> {
    return this.operatingSystem.findAll(where);
  }

  async findOne(id: number) {
    return `This action returns a #${id} operatingSystem`;
  }

  async update(id: number, updateOperatingSystemDto: UpdateOperatingSystemDto) {
    return `This action updates a #${id} operatingSystem ${updateOperatingSystemDto}`;
  }

  async remove(id: number) {
    return `This action removes a #${id} operatingSystem`;
  }
}
