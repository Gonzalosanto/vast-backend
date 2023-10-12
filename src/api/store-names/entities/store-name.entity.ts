import {
  Table,
  Column,
  Model,
  BelongsToMany,
  ForeignKey,
} from 'sequelize-typescript';
import { applicationStore } from '../../store-urls/entities/store-url.entity';
import { applicationName } from '../../names/entities/name.entity';
import { applicationBundle } from '../../bundles/entities/bundles.entity';
import { BundleStoreName } from '../../bundle-store-names/entities/bundle-store-name.entity';
@Table
export class StoreNames extends Model {
  @ForeignKey(() => applicationStore)
  @Column
  applicationStoreId: number;

  @ForeignKey(() => applicationName)
  @Column
  applicationNameId: number;

  @BelongsToMany(() => applicationBundle, () => BundleStoreName)
  bundleStoreName: BundleStoreName[];
}
