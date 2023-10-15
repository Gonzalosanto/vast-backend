import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AidsService } from './aids.service';
import { CreateAidDto } from './dto/create-aid.dto';
import { UpdateAidDto } from './dto/update-aid.dto';

@Controller('aids')
export class AidsController {
  constructor(private readonly aidsService: AidsService) {}

  @Post()
  create(@Body() createAidDto: CreateAidDto) {
    return this.aidsService.create(createAidDto);
  }

  @Get()
  findAll() {
    return this.aidsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aidsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAidDto: UpdateAidDto) {
    return this.aidsService.update(+id, updateAidDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aidsService.remove(+id);
  }
}
