import { Table, Column, Model } from 'sequelize-typescript';
@Table
export class DeviceId extends Model {
  @Column
  deviceid: string;
}
