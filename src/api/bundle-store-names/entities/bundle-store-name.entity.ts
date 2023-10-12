import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { StoreNames } from '../../store-names/entities/store-name.entity';
import { applicationBundle } from '../../bundles/entities/bundles.entity';
@Table
export class BundleStoreName extends Model {
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
