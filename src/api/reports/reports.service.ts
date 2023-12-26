import { Inject, Injectable } from '@nestjs/common';
import { Report } from './entities/report.entity';
import { SupplyAid } from '../../main/aids/entities/supply-aid.entity';
import { DemandAid } from '../../main/aids/entities/demand-aid.entity';
import { CreateReportDto } from './dto/create_report.dto'
import { applicationBundle } from '../../main/bundles/entities/bundles.entity';
import { BundleStoreName } from '../../main/bundle-store-names/entities/bundle-store-name.entity';

@Injectable()
export class ReportsService {
  constructor(
    @Inject('REPORT_REPOSITORY') private reportRepository: typeof Report,
    @Inject('SUPPLY_REPOSITORY') private supplyRepository: typeof SupplyAid,
    @Inject('DEMAND_REPOSITORY') private demandRepository: typeof DemandAid,
  ) {}
  async create(createReportsDto: CreateReportDto) {
    const currentReportWithExistingSupplyAid =await this.reportRepository.findOne({where: {'supply_aid': createReportsDto.supply_aid}})
    if(currentReportWithExistingSupplyAid){
      currentReportWithExistingSupplyAid.requests += 1;
      currentReportWithExistingSupplyAid.impressions += createReportsDto.impressions;
      //currentReportWithExistingSupplyAid.demandAid = createReportsDto.demand_aid; //CHECK DATA TYPE
    }
    return this.reportRepository.create({currentReportWithExistingSupplyAid});
  }

  async findAll(): Promise<Report[]> {
    const results = await this.reportRepository.findAll({
      attributes: ['id', 'requests', 'impressions'],
      include: [
        {
          model: BundleStoreName,
          attributes: ['applicationBundleId'],
          include: [
            {
              model: applicationBundle,
              attributes: ['bundle'],
            },
          ],
        },
        {
          model: SupplyAid,
          attributes: ['aid'],
        },
        {
          model: DemandAid,
          attributes: ['aid'],
        },
      ], raw: true
    });
    return results;
  }

  async update(body: Report, options: any): Promise<any> {
    return this.reportRepository.update(body, options);
  }

  async remove(options: any): Promise<any> {
    return this.reportRepository.destroy(options);
  }
}
