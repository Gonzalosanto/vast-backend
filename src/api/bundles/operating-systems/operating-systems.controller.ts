import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OperatingSystemsService } from './operating-systems.service';
import { CreateOperatingSystemDto } from './dto/create-operating-system.dto';
import { UpdateOperatingSystemDto } from './dto/update-operating-system.dto';

@Controller('operating-systems')
export class OperatingSystemsController {
  constructor(
    private readonly operatingSystemsService: OperatingSystemsService,
  ) {}

  @Post()
  create(@Body() createOperatingSystemDto: CreateOperatingSystemDto) {
    return this.operatingSystemsService.create(createOperatingSystemDto);
  }

  @Get()
  findAll() {
    return this.operatingSystemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.operatingSystemsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOperatingSystemDto: UpdateOperatingSystemDto,
  ) {
    return this.operatingSystemsService.update(+id, updateOperatingSystemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.operatingSystemsService.remove(+id);
  }
}
