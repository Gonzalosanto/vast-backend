import { Injectable, Inject } from '@nestjs/common';
import { CreateAidDto } from './dto/create-aid.dto';
import { UpdateAidDto } from './dto/update-aid.dto';
import { SupplyAid } from './entities/supply-aid.entity';
import { FindOptions } from 'sequelize';

@Injectable()
export class AidsService {
  constructor(
    @Inject('AID_REPOSITORY') private aidRepository: typeof SupplyAid,
  ) { }

  async create(createAidDto: CreateAidDto) {
    return this.aidRepository.create({ aid: createAidDto.supply_aid });
  }

  async findAll(options: FindOptions<any>) {
    return this.aidRepository.findAll(options);
  }

  async findOne(where: any, options?: any) {
    return this.aidRepository.findOne({ where: where, ...options });
  }

  async update(id: number, updateAidDto: UpdateAidDto) {
    return `This action updates a #${id} aid and their values with ${updateAidDto}`;
  }

  async remove(id: number) {
    return `This action removes a #${id} aid`;
  }
}
