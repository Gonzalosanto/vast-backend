import { Inject, Injectable } from '@nestjs/common';
import { Report } from './entities/report.entity';
import { SupplyAid } from '../aids/entities/supply-aid.entity';
import { DemandAid } from '../aids/entities/demand-aid.entity';
import { applicationBundle } from '../bundles/entities/bundles.entity';
import { BundleStoreName } from '../bundle-store-names/entities/bundle-store-name.entity';

@Injectable()
export class ReportsService {
  constructor(
    @Inject('REPORT_REPOSITORY') private reportRepository: typeof Report,
    @Inject('SUPPLY_REPOSITORY') private supplyRepository: typeof SupplyAid,
    @Inject('DEMAND_REPOSITORY') private demandRepository: typeof DemandAid,
  ) {}
  async create(createReportsDto: any) {
    return createReportsDto;
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
      ],
    });
    return results;
  }

  async findOne(where: any, options: any) {
    return this.reportRepository.findAll({ where: where, ...options });
  }

  async update(body: Report, options: any): Promise<any> {
    return this.reportRepository.update(body, options);
  }

  async remove(options: any): Promise<any> {
    return this.reportRepository.destroy(options);
  }
}
