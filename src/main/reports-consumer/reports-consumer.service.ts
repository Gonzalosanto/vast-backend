import { Injectable, OnModuleInit } from '@nestjs/common';
import { ReportsService } from 'src/api/reports/reports.service';
import { ConsumerService } from '../kafka/consumer.service';
import 'dotenv/config';
import { Report } from 'src/api/reports/entities/report.entity';

@Injectable()
export class ReportConsumer implements OnModuleInit {
    constructor(
        private reportsService: ReportsService,
        private consumerService: ConsumerService){}
    
    async onModuleInit() {
        await this.consumerService.handleReportsSubscription(async (msg: string)=>{
            await this.consumeReports(JSON.parse(msg));
        })
    }
     
    async consumeReports(report: Report){        
        await this.reportsService.save(report);
    }
}
