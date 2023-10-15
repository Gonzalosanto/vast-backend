import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StoreNamesService } from './store-names.service';
import { CreateStoreNameDto } from './dto/create-store-name.dto';
import { UpdateStoreNameDto } from './dto/update-store-name.dto';

@Controller('store-names')
export class StoreNamesController {
  constructor(private readonly storeNamesService: StoreNamesService) {}

  @Post()
  create(@Body() createStoreNameDto: CreateStoreNameDto) {
    return this.storeNamesService.create(createStoreNameDto);
  }

  @Get()
  findAll() {
    return this.storeNamesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storeNamesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStoreNameDto: UpdateStoreNameDto,
  ) {
    return this.storeNamesService.update(+id, updateStoreNameDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storeNamesService.remove(+id);
  }
}
