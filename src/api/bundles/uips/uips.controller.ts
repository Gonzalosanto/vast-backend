import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UipsService } from './uips.service';
import { CreateUipDto } from './dto/create-uip.dto';
import { UpdateUipDto } from './dto/update-uip.dto';

@Controller('uips')
export class UipsController {
  constructor(private readonly uipsService: UipsService) {}

  @Post()
  create(@Body() createUipDto: CreateUipDto) {
    return this.uipsService.create(createUipDto);
  }

  @Get()
  findAll() {
    return this.uipsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.uipsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUipDto: UpdateUipDto) {
    return this.uipsService.update(+id, updateUipDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.uipsService.remove(+id);
  }
}
