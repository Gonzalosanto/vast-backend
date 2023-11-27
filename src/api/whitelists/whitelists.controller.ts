import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WhitelistsService } from './whitelists.service';
import { CreateWhitelistDto } from './dto/create-whitelist.dto';
import { UpdateWhitelistDto } from './dto/update-whitelist.dto';

@Controller('whitelists')
export class WhitelistsController {
  constructor(private readonly whitelistsService: WhitelistsService) {}

  @Post()
  create(@Body() createWhitelistDto: any) {
    return this.whitelistsService.create(createWhitelistDto);
  }

  @Get()
  findAll() {
    return this.whitelistsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.whitelistsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWhitelistDto: UpdateWhitelistDto) {
    return this.whitelistsService.update(+id, updateWhitelistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.whitelistsService.remove(+id);
  }

  @Delete()
  removeAll() {
    return this.whitelistsService.removeAll();
  }

}
