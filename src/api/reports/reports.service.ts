import { Inject, Injectable } from '@nestjs/common';
import { Report } from './entities/report.entity';
import { SupplyAid } from '../aids/entities/supply-aid.entity';
import { DemandAid } from '../aids/entities/demand-aid.entity';
@Injectable()
export class ReportsService {
    constructor(@Inject('REPORT_REPOSITORY') private reportRepository: typeof Report,
        @Inject('SUPPLY_REPOSITORY') private supplyRepository: typeof SupplyAid,
        @Inject('DEMAND_REPOSITORY') private demandRepository: typeof DemandAid){}

    async getAllReports() : Promise<any>{
        return this.reportRepository.findAll();
    }

    async getAllSupplyAID(){
        return this.supplyRepository.findAll()
    }

    async getAllDemandAID(){
        return this.demandRepository.findAll()
    }
}