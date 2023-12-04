import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  PrimaryKey,
  HasMany
} from 'sequelize-typescript';
import { StoreNames } from '../../store-names/entities/store-name.entity';
import { applicationBundle } from '../../bundles/entities/bundles.entity';
import { Whitelist } from 'src/api/whitelists/entities/whitelist.entity';
@Table
export class BundleStoreName extends Model {
  @PrimaryKey
  @Column({autoIncrement: true, primaryKey: true})
  declare bsn_id: number

  @ForeignKey(() => StoreNames)
  @Column({unique: false})
  declare storeNameId: number;

  @ForeignKey(() => applicationBundle)
  @Column({unique: false})
  declare applicationBundleId: number;

  @BelongsTo(() => StoreNames)
  storeName: StoreNames;

  @BelongsTo(() => applicationBundle)
  applicationBundle: applicationBundle;

  @HasMany(() => Whitelist)
  wl_id: Whitelist
}
