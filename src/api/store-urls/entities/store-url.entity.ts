import {
  Table,
  Column,
  Model,
  BelongsTo,
  ForeignKey,
  DataType,
} from 'sequelize-typescript';
import { OperatingSystem } from '../../operating-systems/entities/operating-system.entity';
@Table
export class applicationStore extends Model {
  @Column
  declare store: string;

  @ForeignKey(() => OperatingSystem)
  @Column
  declare operatingSystemId: number;

  @BelongsTo(() => OperatingSystem)
  operatingSystem: OperatingSystem;
}
