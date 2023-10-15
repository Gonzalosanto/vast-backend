import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StoreUrlsService } from './store-urls.service';
import { CreateStoreUrlDto } from './dto/create-store-url.dto';
import { UpdateStoreUrlDto } from './dto/update-store-url.dto';

@Controller('store-urls')
export class StoreUrlsController {
  constructor(private readonly storeUrlsService: StoreUrlsService) {}

  @Post()
  create(@Body() createStoreUrlDto: CreateStoreUrlDto) {
    return this.storeUrlsService.create(createStoreUrlDto);
  }

  @Get()
  findAll() {
    return this.storeUrlsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storeUrlsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStoreUrlDto: UpdateStoreUrlDto,
  ) {
    return this.storeUrlsService.update(+id, updateStoreUrlDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storeUrlsService.remove(+id);
  }
}
