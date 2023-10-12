import { Table, Column, Model, BelongsToMany } from 'sequelize-typescript';
import { BundleStoreName } from '../../bundle-store-names/entities/bundle-store-name.entity';
import { StoreNames } from '../../store-names/entities/store-name.entity';

@Table
export class applicationBundle extends Model {
  @Column
  declare bundle: string;

  @BelongsToMany(() => StoreNames, () => BundleStoreName)
  bundleStoreName: BundleStoreName[];
}
