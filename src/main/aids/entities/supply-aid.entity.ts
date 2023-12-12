import { Table, Column, Model,HasMany } from 'sequelize-typescript';
import { Whitelist } from 'src/api/whitelists/entities/whitelist.entity';
@Table
export class SupplyAid extends Model {
  @Column
  declare aid: number;

  @HasMany(() => Whitelist)
  wl_id: number

}