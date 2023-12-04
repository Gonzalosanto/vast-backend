import { PartialType } from '@nestjs/mapped-types';
import { CreateOperatingSystemDto } from './create-operating-system.dto';

export class UpdateOperatingSystemDto extends PartialType(
  CreateOperatingSystemDto,
) {}
