import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BundleStoreNamesService } from './bundle-store-names.service';
import { CreateBundleStoreNameDto } from './dto/create-bundle-store-name.dto';
import { UpdateBundleStoreNameDto } from './dto/update-bundle-store-name.dto';

@Controller('bundle-store-names')
export class BundleStoreNamesController {
  constructor(
    private readonly bundleStoreNamesService: BundleStoreNamesService,
  ) {}

  @Post()
  create(@Body() createBundleStoreNameDto: CreateBundleStoreNameDto) {
    return this.bundleStoreNamesService.create(createBundleStoreNameDto);
  }

  @Get()
  findAll() {
    return this.bundleStoreNamesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bundleStoreNamesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBundleStoreNameDto: UpdateBundleStoreNameDto,
  ) {
    return this.bundleStoreNamesService.update(+id, updateBundleStoreNameDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bundleStoreNamesService.remove(+id);
  }
}
