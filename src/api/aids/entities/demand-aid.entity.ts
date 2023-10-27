import { Table, Column, Model } from 'sequelize-typescript';
@Table
export class DemandAid extends Model {
  @Column
  aid: number;
}