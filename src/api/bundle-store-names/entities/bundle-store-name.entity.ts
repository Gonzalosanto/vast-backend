import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  PrimaryKey,
} from 'sequelize-typescript';
import { StoreNames } from '../../store-names/entities/store-name.entity';
import { applicationBundle } from '../../bundles/entities/bundles.entity';
@Table
export class BundleStoreName extends Model {
  @PrimaryKey
  @Column
  bsn_id: number

  @ForeignKey(() => StoreNames)
  @Column
  storeNameId: number;

  @BelongsTo(() => StoreNames)
  storeName: StoreNames;

  @ForeignKey(() => applicationBundle)
  @Column
  applicationBundleId: number;

  @BelongsTo(() => applicationBundle)
  applicationBundle: applicationBundle;
}
