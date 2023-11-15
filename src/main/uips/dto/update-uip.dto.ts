import { PartialType } from '@nestjs/mapped-types';
import { CreateUipDto } from './create-uip.dto';

export class UpdateUipDto extends PartialType(CreateUipDto) {}
