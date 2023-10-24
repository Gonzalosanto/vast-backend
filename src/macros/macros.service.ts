import { Injectable } from '@nestjs/common';
import {
  BundleStoreNamesService,
  BundlesService,
  NamesService,
  DevicesService,
  StoreNamesService,
  StoreUrlsService,
  UipsService,
  UserAgentsService,
} from '../api/index';
import { OperatingSystemsService } from 'src/api/operating-systems/operating-systems.service';
import { CreateMacroDto } from './dto/create-macro.dto';
import { CreateBundleStoreNameDto } from 'src/api/bundle-store-names/dto/create-bundle-store-name.dto';

@Injectable()
export class MacrosService {
  constructor(
    private bundleStoreNamesService: BundleStoreNamesService,
    private operatingSystems: OperatingSystemsService,
    private userAgents: UserAgentsService,
    private devices: DevicesService,
  ) {}

  async getMacros(): Promise<any> {
    return this.bundleStoreNamesService.findAll();
  }

  async createFromFormData(macros: CreateMacroDto): Promise<any> {
    this.operatingSystems.create(macros);
  }

  async createFromFileData(fileData: any): Promise<any> {
    const os = { os: fileData.data[0][3] };
    const bundle = fileData.data[0][0];
    const name = fileData.data[0][1];
    const store = fileData.data[0][2];
    console.log({ bundle, name, store });
    await this.operatingSystems.create(os);
  }

  updateMacros(macros: any, options: any) {
    return;
  }

  deleteMacros(options: any) {
    return;
  }
}
