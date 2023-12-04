import { PartialType } from '@nestjs/mapped-types';
import { CreateAidFormDto } from './create-aid_form.dto';

export class UpdateAidFormDto extends PartialType(CreateAidFormDto) {}
