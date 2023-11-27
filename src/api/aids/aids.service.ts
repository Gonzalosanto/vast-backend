import { Injectable, Inject } from '@nestjs/common';
import { CreateAidDto } from './dto/create-aid.dto';
import { UpdateAidDto } from './dto/update-aid.dto';
import { SupplyAid } from './entities/supply-aid.entity';

@Injectable()
export class AidsService {
  constructor(
    @Inject('AID_REPOSITORY') private aidRepository: typeof SupplyAid,
  ) {}

  async create(createAidDto: any) {
    return this.aidRepository.create(createAidDto);
  }

  findAll() {
    return `This action returns all aids`;
  }

  async findOne(where: any, options?:any) {
    return this.aidRepository.findOne({where: where, ...options});
  }

  update(id: number, updateAidDto: UpdateAidDto) {
    return `This action updates a #${id} aid and their values with ${updateAidDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} aid`;
  }
}
