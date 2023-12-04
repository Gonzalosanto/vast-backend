import { Controller, Get, Post, Body, Patch, Param, Delete, InternalServerErrorException } from '@nestjs/common';
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
    return this.whitelistsService.getAllWhitelists();
  }

  @Get(':aid')
  findOne(@Param('aid') supply_aid: string) {
      return this.whitelistsService.findAllByAid({'aid_id': supply_aid});
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
