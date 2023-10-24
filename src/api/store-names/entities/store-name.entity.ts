import {
  Table,
  Column,
  Model,
  BelongsToMany,
  ForeignKey,
  PrimaryKey,
  BelongsTo,
} from 'sequelize-typescript';
import { applicationStore } from '../../store-urls/entities/store-url.entity';
import { applicationName } from '../../names/entities/name.entity';
import { applicationBundle } from '../../bundles/entities/bundles.entity';
import { BundleStoreName } from '../../bundle-store-names/entities/bundle-store-name.entity';
@Table
export class StoreNames extends Model {
  @PrimaryKey
  @Column({primaryKey: true, autoIncrement: true})
  declare sn_id:number;

  @ForeignKey(() => applicationStore)
  @Column({unique: false})
  declare applicationStoreId: number;

  @BelongsTo(()=>applicationStore)
  applicationStore: applicationStore;

  @BelongsTo(() => applicationStore)
  applicationStore: applicationStore;

  @ForeignKey(() => applicationName)
  @Column({unique:false})
  declare applicationNameId: number;

  @BelongsTo(() => applicationName)
  applicationName: applicationName;

  @BelongsTo(() => applicationName)
  applicationName: applicationName[];

  @BelongsToMany(() => applicationBundle, () => BundleStoreName)
  bundleStoreName: BundleStoreName[];
}

