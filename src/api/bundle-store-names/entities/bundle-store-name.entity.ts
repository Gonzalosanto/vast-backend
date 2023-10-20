import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  PrimaryKey,
  AutoIncrement,
  Unique,
} from 'sequelize-typescript';
import { StoreNames } from '../../store-names/entities/store-name.entity';
import { applicationBundle } from '../../bundles/entities/bundles.entity';
@Table
export class BundleStoreName extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  bsn_id: number

  @ForeignKey(() => StoreNames)
  @Unique(false)
  @Column
  storeNameId: number;

  @BelongsTo(() => StoreNames)
  storeName: StoreNames;

  @ForeignKey(() => applicationBundle)
  @Unique(false)
  @Column
  applicationBundleId: number;

  @BelongsTo(() => applicationBundle)
  applicationBundle: applicationBundle;
}
