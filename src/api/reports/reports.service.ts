import { Injectable } from '@nestjs/common';
import { Report } from './entities/report.entity';
import { SupplyAid } from '../aids/entities/supply-aid.entity';
import { DemandAid } from '../aids/entities/demand-aid.entity';

@Injectable()
export class ReportsService {
  constructor(@Inject('REPORT_REPOSITORY') private reportRepository: typeof Report,
    @Inject('SUPPLY_REPOSITORY') private supplyRepository: typeof SupplyAid,
    @Inject('DEMAND_REPOSITORY') private demandRepository: typeof DemandAid){}
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