import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Report } from './entities/report.entity';
import { SupplyAid } from '../../main/aids/entities/supply-aid.entity';
import { DemandAid } from '../../main/aids/entities/demand-aid.entity';
import { CreateReportDto } from './dto/create_report.dto'
import { applicationBundle } from '../../main/bundles/entities/bundles.entity';
import { BundleStoreName } from '../../main/bundle-store-names/entities/bundle-store-name.entity';
import { BundlesService } from '../../main/bundles/bundles.service';

@Injectable()
export class ReportsService {
  constructor(
    @Inject('REPORT_REPOSITORY') private reportRepository: typeof Report,
    @Inject('SUPPLY_REPOSITORY') private supplyRepository: typeof SupplyAid,
    @Inject('DEMAND_REPOSITORY') private demandRepository: typeof DemandAid,
    private bundleService: BundlesService
  ){}
  //Adds a report if not exist supply_aid report for X hour, otherwise, updates it.
  async save(report: Report): Promise<void> {
    const reportValues = report;
    const bundleInstance = await this.bundleService.findOne({'bundle':reportValues.bundle})
    if(!bundleInstance) throw new Error(`${reportValues.bundle} does not exist`);
    const supplyAidFK = await this.supplyRepository.findOne({where: {'aid': reportValues.supply_aid}});
    const demandAidFK = await this.demandRepository.findOrCreate({where: {'aid': reportValues.demand_aid}});
    const existingReport = await this.reportRepository.findOrCreate({ where: { 'supply_aid': supplyAidFK.id, 'bundle': bundleInstance.id } });
    await this.reportRepository.update({
      'requests': (existingReport[0]?.requests ?? 0) + reportValues.requests,
      'impressions': (existingReport[0]?.impressions ?? 0) + reportValues.impressions,
      'bundle': bundleInstance.id,
      'supply_aid': supplyAidFK.id,
      'demand_aid': report.demand_aid ? demandAidFK[0]?.id : null,
      'lastTime': new Date().toISOString()
    }, {where: {'id': existingReport[0].id}});

  }
  async findAll(): Promise<Report[]> {
    const results = await this.reportRepository.findAll({
      attributes: ['id', 'requests', 'impressions'],
      include: [
        {
          model: BundleStoreName,
          attributes: [],
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
    const filteredResultsByCondition = results.filter(r => r.impressions >10 && (r.impressions / r.requests) * 100>=0.01);
    return filteredResultsByCondition;
  }

  async update(body: Report, options: any): Promise<any> {
    return this.reportRepository.update(body, options);
  }

  async remove(options: any): Promise<any> {
    return this.reportRepository.destroy(options);
  }
}
