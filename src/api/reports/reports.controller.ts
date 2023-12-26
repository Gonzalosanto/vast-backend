import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { Report } from './entities/report.entity';
import { CreateReportDto } from './dto/create_report.dto';

@Controller('reports')
export class ReportsController {
  constructor(private reportService: ReportsService) {}
  @Get()
  async getBundles() {
    return this.reportService.findAll();
  }

  @Post()
  async createBundle(createReportDto: CreateReportDto) {
    return this.reportService.create(createReportDto);
  }
  @Put()
  async updateBundles(body: Report, options: any) {
    return this.reportService.update(body, options);
  }
  @Delete()
  async deleteBundles(options: any) {
    return this.reportService.remove(options);
  }
}
