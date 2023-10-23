import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  PrimaryKey,
  HasMany,
} from 'sequelize-typescript';
import { StoreNames } from '../../store-names/entities/store-name.entity';
import { applicationBundle } from '../../bundles/entities/bundles.entity';
@Table
export class BundleStoreName extends Model {
  @PrimaryKey
  @Column
  bsn_id:number;

  @ForeignKey(() => StoreNames)
  @Column
  storeNameId: number;

  @BelongsTo(() => StoreNames)
  storeName: number;

  @ForeignKey(() => applicationBundle)
  @Column
  applicationBundleId: number;

  @BelongsTo(() => applicationBundle)
  applicationBundle: string;
}
