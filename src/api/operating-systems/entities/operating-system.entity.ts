import { Table, Column, Model, HasMany } from 'sequelize-typescript';
import { applicationStore } from '../../store-urls/entities/store-url.entity';
@Table
export class OperatingSystem extends Model {
  @Column
  os: string;

  @HasMany(() => applicationStore)
  store: applicationStore;
}
