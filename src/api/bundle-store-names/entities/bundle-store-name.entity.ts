import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  PrimaryKey,
  AutoIncrement,
  Unique,
  HasMany,
} from 'sequelize-typescript';
import { StoreNames } from '../../store-names/entities/store-name.entity';
import { applicationBundle } from '../../bundles/entities/bundles.entity';
import { Whitelist } from 'src/api/whitelists/entities/whitelist.entity';
@Table
export class BundleStoreName extends Model {
  @PrimaryKey
  @Column({autoIncrement: true, primaryKey: true})
  bsn_id: number

  @ForeignKey(() => StoreNames)
  @Column({unique: false})
  storeNameId: number;

  @BelongsTo(() => StoreNames)
  storeName: StoreNames;

  @ForeignKey(() => applicationBundle)
  @Column({unique: false})
  applicationBundleId: number;

  @BelongsTo(() => applicationBundle)
  applicationBundle: applicationBundle;

  @HasMany(() => Whitelist)
  wl_id: number
}
