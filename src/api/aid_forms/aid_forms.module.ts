import { Module } from '@nestjs/common';
import { AidFormsService } from './aid_forms.service';
import { AidFormsController } from './aid_forms.controller';
import { AidForm } from './entities/aid_form.entity';

@Module({
  controllers: [AidFormsController],
  providers: [AidFormsService, {provide: 'AID_FORM_REPOSITORY', useValue: AidForm}],
  exports:[AidFormsService]
})
export class AidFormsModule {}
