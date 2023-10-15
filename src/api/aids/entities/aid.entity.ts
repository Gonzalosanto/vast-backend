import { Table, Column, Model } from 'sequelize-typescript';
@Table
export class Aid extends Model {
  @Column
  aid: string;
}
