import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AidFormsService } from './aid_forms.service';
import { CreateAidFormDto } from './dto/create-aid_form.dto';
import { UpdateAidFormDto } from './dto/update-aid_form.dto';

@Controller('aid-forms')
export class AidFormsController {
  constructor(private readonly aidFormsService: AidFormsService) {}

  @Post()
  create(@Body() createAidFormDto: CreateAidFormDto) {
    return this.aidFormsService.create(createAidFormDto);
  }

  @Get()
  findAll() {
    return this.aidFormsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aidFormsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAidFormDto: UpdateAidFormDto) {
    return this.aidFormsService.update(+id, updateAidFormDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aidFormsService.remove(+id);
  }
}
