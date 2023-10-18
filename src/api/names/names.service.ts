import { Injectable, Inject } from '@nestjs/common';
import { CreateNameDto } from './dto/create-name.dto';
import { UpdateNameDto } from './dto/update-name.dto';
import { applicationName } from './entities/name.entity';

@Injectable()
export class NamesService {
  constructor(@Inject('NAME_REPOSITORY') private nameRepository: typeof applicationName){}
  async create(createNameDto: any) {
    const currentNames = await this.findAll(createNameDto);
    if(currentNames.length > 0) return;
    return this.nameRepository.create(createNameDto);
  }

  async findAll(where?: any) {
    return this.nameRepository.findAll(where ?? {});
  }

  async findOne(id: number) {
    return `This action returns a #${id} name`;
  }

  async update(id: number, updateNameDto: UpdateNameDto) {
    return `This action updates a #${id} name with ${updateNameDto}`;
  }

  async remove(id: number) {
    return `This action removes a #${id} name`;
  }
}
