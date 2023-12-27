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
    const reportValues = report.dataValues;
    const bundleInstance = await this.bundleService.findOne({'bundle':reportValues.bundle})
    if(!bundleInstance) throw new BadRequestException({message: `Bundle: ${reportValues.bundle} does not exist`})
    const supplyAidFK = await this.supplyRepository.findOne({where: {'aid': reportValues.supply_aid}});
    const demandAidFK = await this.demandRepository.findOrCreate({where: {'aid': reportValues.demand_aid}});
    const existingReport = await this.reportRepository.findOrCreate({ where: { 'supply_aid': supplyAidFK.id } });
    await existingReport[0].update({
      'requests': existingReport[0].requests + reportValues.requests,
      'impressions': existingReport[0].impressions + reportValues.impressions,
      'bundle': bundleInstance.id,
      'supply_aid': supplyAidFK.id,
      'demand_aid': demandAidFK[0].id,
      'lastTime': new Date().toISOString()
    });
  }
  async findAll(): Promise<Report[]> {
    // await this.save(new Report({
    //   supply_aid: 111111, demand_aid: 123456, requests: 10, impressions: 0, bundle: "14"
    // }))
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
    return results;
  }

  async update(body: Report, options: any): Promise<any> {
    return this.reportRepository.update(body, options);
  }

  async remove(options: any): Promise<any> {
    return this.reportRepository.destroy(options);
  }
}
