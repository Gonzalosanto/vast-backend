import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { AidForm } from 'src/api/aid_forms/entities/aid_form.entity';
import { SupplyAid } from 'src/api/aids/entities/supply-aid.entity';
import { BundleStoreName } from 'src/api/bundle-store-names/entities/bundle-store-name.entity';

@Table
export class Whitelist extends Model {
  
  @Column({ autoIncrement: true, primaryKey: true })
  wl_id: number;

  @ForeignKey(() => SupplyAid)
  @Column
  aid: number;

  @ForeignKey(() => BundleStoreName)
  @Column
  bsn_id: number;

  @ForeignKey(() => AidForm)
  @Column
  id_form: number;

  @BelongsTo(() => SupplyAid)
  suplyAid: SupplyAid;

  @BelongsTo(() => BundleStoreName)
  bundleStoreName: BundleStoreName;

  @BelongsTo(() => AidForm)
  aid_form: AidForm;
   
}
