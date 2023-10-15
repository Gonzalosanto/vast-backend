import { PartialType } from '@nestjs/mapped-types';
import { CreateStoreUrlDto } from './create-store-url.dto';

export class UpdateStoreUrlDto extends PartialType(CreateStoreUrlDto) {}
