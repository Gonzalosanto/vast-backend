import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { OperatingSystem } from '../../operating-systems/entities/operating-system.entity';
import { DeviceId } from 'src/main/devices/entities/device.entity';
import { Uip } from 'src/main/uips/entities/uip.entity';
@Table
export class UserAgent extends Model {
  @Column({unique:true})
  declare ua: string;

  @ForeignKey(() => OperatingSystem)
  @Column
  declare operatingSystemId: number;

  @BelongsTo(() => OperatingSystem)
  operatingSystem: OperatingSystem;

  @HasMany(() => DeviceId)
  deviceId: DeviceId

  @HasMany(() => Uip)
  uip: Uip

}
