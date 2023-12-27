import { Controller, Get} from '@nestjs/common';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private reportService: ReportsService) {}
  @Get()
  async getBundles() {
    return this.reportService.findAll();
  }
}
