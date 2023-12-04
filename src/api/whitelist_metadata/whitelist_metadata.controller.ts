import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WhitelistMetadataService } from './whitelist_metadata.service';
import { CreateAidFormDto } from './dto/create-aid_form.dto';
import { UpdateAidFormDto } from './dto/update-aid_form.dto';

@Controller('whitelists/metadata')
export class WhitelistMetadataController {
  constructor(private readonly metadataService: WhitelistMetadataService) {}

  @Post()
  create(@Body() createAidFormDto: CreateAidFormDto) {
    return this.metadataService.create(createAidFormDto);
  }

  @Get()
  findAll() {
    return this.metadataService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.metadataService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAidFormDto: UpdateAidFormDto) {
    return this.metadataService.update(+id, updateAidFormDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.metadataService.remove(+id);
  }
}
