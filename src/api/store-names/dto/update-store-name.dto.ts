import { PartialType } from '@nestjs/mapped-types';
import { CreateStoreNameDto } from './create-store-name.dto';

export class UpdateStoreNameDto extends PartialType(CreateStoreNameDto) {}
