import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { WhitelistMetadata } from 'src/api/whitelist_metadata/entities/whitelist_metadata.entity';
import { SupplyAid } from 'src/api/aids/entities/supply-aid.entity';
import { BundleStoreName } from 'src/api/bundle-store-names/entities/bundle-store-name.entity';

@Table
export class Whitelist extends Model {
  
  @Column({ autoIncrement: true, primaryKey: true })
  declare wl_id: number;

  @ForeignKey(() => SupplyAid)
  @Column
  declare aid_id: number;

  @ForeignKey(() => BundleStoreName)
  @Column
  declare bsn_id: number;

  @ForeignKey(() => WhitelistMetadata)
  @Column
  declare id_form: number;

  @BelongsTo(() => SupplyAid, {onDelete:'NO ACTION', onUpdate:'NO ACTION'})
  supplyAid: SupplyAid;

  @BelongsTo(() => BundleStoreName, {onDelete: 'NO ACTION', onUpdate: 'NO ACTION'})
  bundleStoreName: BundleStoreName;

  @BelongsTo(() => WhitelistMetadata, {onDelete:'NO ACTION', onUpdate:'NO ACTION'})
  aid_form: WhitelistMetadata;   
}
