import { Injectable, Inject } from '@nestjs/common';
import { CreateAidFormDto } from './dto/create-aid_form.dto';
import { UpdateAidFormDto } from './dto/update-aid_form.dto';
import { WhitelistMetadata } from './entities/whitelist_metadata.entity';
import { FindOptions } from 'sequelize';

@Injectable()
export class WhitelistMetadataService {
  constructor(
    @Inject('AID_FORM_REPOSITORY') private whitelistMetadataRepository: typeof WhitelistMetadata,
  ) {}

  async create(createAidFormDto: any) {
    return this.whitelistMetadataRepository.create(createAidFormDto);
  }

  async findAll() {
    return this.whitelistMetadataRepository.findAll();
  }

  async findByWhitelist(options?: FindOptions<any>){
    return this.whitelistMetadataRepository.findAll(options)
  }

  async findOne(where: any, options?: any) {
    return this.whitelistMetadataRepository.findOne({where, ...options});
  }

  update(id: number, updateAidFormDto: UpdateAidFormDto) {
    return `This action updates a #${id} aidForm`;
  }

  async remove(id: number) {
    return this.whitelistMetadataRepository.destroy({where: {'id': id}});
  }
}
