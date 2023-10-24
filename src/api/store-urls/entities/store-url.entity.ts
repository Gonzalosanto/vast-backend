import {
  Table,
  Column,
  Model,
  BelongsTo,
  ForeignKey,
  BelongsToMany,
  HasMany,
} from 'sequelize-typescript';
import { OperatingSystem } from '../../operating-systems/entities/operating-system.entity';
import { applicationName } from 'src/api/names/entities/name.entity';
import { StoreNames } from 'src/api/store-names/entities/store-name.entity';
@Table
export class applicationStore extends Model {
  @Column
  declare store: string;

  @ForeignKey(() => OperatingSystem)
  @Column
  declare operatingSystemId: number;

  @BelongsTo(() => OperatingSystem)
  operatingSystem: OperatingSystem;

  @BelongsToMany(() => applicationName, () => StoreNames)
  storeName: StoreNames[];

  @HasMany(() => StoreNames)
  storeNames: StoreNames[];

}