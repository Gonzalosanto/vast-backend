import { Module } from '@nestjs/common';
import { WhitelistMetadataService } from './whitelist_metadata.service';
import { WhitelistMetadataController } from './whitelist_metadata.controller';
import { WhitelistMetadata } from './entities/whitelist_metadata.entity';

@Module({
  controllers: [WhitelistMetadataController],
  providers: [WhitelistMetadataService, {provide: 'AID_FORM_REPOSITORY', useValue: WhitelistMetadata}],
  exports:[WhitelistMetadataService]
})
export class AidFormsModule {}
