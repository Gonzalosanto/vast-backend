import { PartialType } from '@nestjs/mapped-types';
import { CreateBundleStoreNameDto } from './create-bundle-store-name.dto';

export class UpdateBundleStoreNameDto extends PartialType(
  CreateBundleStoreNameDto,
) {}
