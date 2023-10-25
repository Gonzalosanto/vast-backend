import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/core/database.module';
import { demandAid, reportProvider, supplyAid } from './reports.providers'
import { ReportsService } from './reports.service';
@Module({
    imports: [DatabaseModule],
    providers: [ReportsService, ...demandAid, ...reportProvider, ...supplyAid],
    exports: [ReportsService, ...demandAid, ...reportProvider, ...supplyAid]
})
export class ReportsModule {}
