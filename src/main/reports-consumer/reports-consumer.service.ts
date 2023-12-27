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
    
    onModuleInit() {
        this.consumerService.handleReportsSubscription((msg: any)=>{
            console.log(msg)
        })
    }
     
    async consumeReports(report: Report){
        
        return this.reportsService.save(report);
    }
}
