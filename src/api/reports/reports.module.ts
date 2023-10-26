import { Module } from '@nestjs/common';
import { ReportsService } from "./reports.service";
import { DatabaseModule } from "src/core/database.module";

@Module({
    imports: [DatabaseModule],
    // controllers: [ReportsController],
    // providers: [ReportsController],
    exports: [ReportsService],
  })
  export class ReportsModule {}