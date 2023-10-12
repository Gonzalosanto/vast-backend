import { Table, Column, Model, BelongsToMany } from 'sequelize-typescript';
import { applicationStore } from '../../store-urls/entities/store-url.entity';
import { StoreNames } from '../../store-names/entities/store-name.entity';
@Table
export class applicationName extends Model {
  @Column
  name: string;

  @BelongsToMany(() => applicationStore, () => StoreNames)
  stores: applicationStore[];
}
