import { Injectable, Inject } from '@nestjs/common';
import { CreateAidFormDto } from './dto/create-aid_form.dto';
import { UpdateAidFormDto } from './dto/update-aid_form.dto';
import { AidForm } from './entities/aid_form.entity';

@Injectable()
export class AidFormsService {
  constructor(
    @Inject('AID_FORM_REPOSITORY') private aidFormRepository: typeof AidForm,
  ) {}

  async create(createAidFormDto: any) {
    return this.aidFormRepository.create(createAidFormDto);
  }

  findAll() {
    return `This action returns all aidForms`;
  }

  findOne(where: any, options?: any) {
    return this.aidFormRepository.findOne({where, ...options});
  }

  update(id: number, updateAidFormDto: UpdateAidFormDto) {
    return `This action updates a #${id} aidForm`;
  }

  remove(id: number) {
    return `This action removes a #${id} aidForm`;
  }
}
