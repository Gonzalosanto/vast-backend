import { Injectable, Inject } from '@nestjs/common';
import { CreateAidFormDto } from './dto/create-aid_form.dto';
import { UpdateAidFormDto } from './dto/update-aid_form.dto';
import { WhitelistMetadata } from './entities/whitelist_metadata.entity';

@Injectable()
export class WhitelistMetadataService {
  constructor(
    @Inject('AID_FORM_REPOSITORY') private aidFormRepository: typeof WhitelistMetadata,
  ) {}

  async create(createAidFormDto: any) {
    return this.aidFormRepository.create(createAidFormDto);
  }

  async findAll(options?:any) {
    return this.aidFormRepository.findAll(options);
  }

  async findOne(where: any, options?: any) {
    return this.aidFormRepository.findOne({where, ...options});
  }

  update(id: number, updateAidFormDto: UpdateAidFormDto) {
    return `This action updates a #${id} aidForm`;
  }

  remove(id: number) {
    return `This action removes a #${id} aidForm`;
  }
}
