import { Table, Column, Model, HasMany } from 'sequelize-typescript';
import { Whitelist } from 'src/api/whitelists/entities/whitelist.entity';
@Table
export class DemandAid extends Model {
  @Column
  declare aid : number;
}