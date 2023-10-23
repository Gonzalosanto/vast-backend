import { Table, Column, Model, BelongsToMany, HasMany } from 'sequelize-typescript';
import { applicationStore } from '../../store-urls/entities/store-url.entity';
import { StoreNames } from '../../store-names/entities/store-name.entity';
@Table
export class applicationName extends Model {
  @Column
  declare name: string;

  //No se necesita
  // @BelongsToMany(() => applicationStore, () => StoreNames)
  // stores: applicationStore[];

  @HasMany(() => StoreNames)
  storeNames: StoreNames[];
}
