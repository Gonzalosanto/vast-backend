import { Table, Column, Model } from 'sequelize-typescript';
@Table
export class SupplyAid extends Model {
  @Column
  aid: number;
}