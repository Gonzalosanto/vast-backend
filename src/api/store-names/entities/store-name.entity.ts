import {
  Table,
  Column,
  Model,
  BelongsToMany,
  ForeignKey,
  PrimaryKey,
  AutoIncrement,
  Unique,
} from 'sequelize-typescript';
import { applicationStore } from '../../store-urls/entities/store-url.entity';
import { applicationName } from '../../names/entities/name.entity';
import { applicationBundle } from '../../bundles/entities/bundles.entity';
import { BundleStoreName } from '../../bundle-store-names/entities/bundle-store-name.entity';
@Table
export class StoreNames extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  sn_id:number;

  @ForeignKey(() => applicationStore)
  @Unique(false)
  @Column
  applicationStoreId: number;

  @ForeignKey(() => applicationName)
  @Unique(false)
  @Column
  applicationNameId: number;

  @BelongsToMany(() => applicationBundle, () => BundleStoreName)
  bundleStoreName: BundleStoreName[];
}
