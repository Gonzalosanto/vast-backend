import { Table, Column, Model, HasMany } from 'sequelize-typescript';
import { applicationStore } from '../../store-urls/entities/store-url.entity';
@Table
export class OperatingSystem extends Model {
  @Column({allowNull: false})
  declare os: string;

  @HasMany(() => applicationStore)
  declare store: applicationStore;
}
