import {
  Table,
  Column,
  Model,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { OperatingSystem } from '../../operating-systems/entities/operating-system.entity';
@Table
export class applicationStore extends Model {
  @Column
  store: string;

  @ForeignKey(() => OperatingSystem)
  @Column
  operatingSystemId: number;

  @BelongsTo(() => OperatingSystem)
  operatingSystem: OperatingSystem;
}
