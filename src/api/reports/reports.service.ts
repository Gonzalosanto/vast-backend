import { Injectable } from '@nestjs/common';

@Injectable()
export class ReportsService {
  async create(createReportsDto: any) {
    return createReportsDto;
  }

  findAll() {
    return;
  }

  findOne(id: number) {
    return `This action returns a #${id} name`;
  }

  update(id: number, updateReportsDto: any) {
    return `This action updates a #${id} name with ${updateReportsDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} name`;
  }
}
