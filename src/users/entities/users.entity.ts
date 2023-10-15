import { Table, Column, Model } from 'sequelize-typescript';
@Table
export class User extends Model {
  @Column
  username: string;

  @Column
  password: string;

  @Column
  role: string;

  @Column
  email: string;
}
