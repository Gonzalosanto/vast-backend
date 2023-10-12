import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { OperatingSystem } from '../../operating-systems/entities/operating-system.entity';
@Table
export class UserAgent extends Model {
  @Column
  ua: string;

  @ForeignKey(() => OperatingSystem)
  @Column
  operatingSystemId: number;

  @BelongsTo(() => OperatingSystem)
  operatingSystem: OperatingSystem;
}
