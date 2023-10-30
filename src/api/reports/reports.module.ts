import { Module } from '@nestjs/common';

import { ReportsService } from "./reports.service";
import { DatabaseModule } from "src/core/database.module";
import { demandAid, reportProvider, supplyAid } from './reports.providers'
import { ReportsController } from './reports.controller';

@Module({
    imports: [DatabaseModule],
    controllers: [ReportsController],
    providers: [ReportsService, ...demandAid, ...reportProvider, ...supplyAid],
    exports: [ReportsService, ...demandAid, ...reportProvider, ...supplyAid],
  })
  export class ReportsModule {}