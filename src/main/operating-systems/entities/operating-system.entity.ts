import { Table, Column, Model, HasMany } from 'sequelize-typescript';
import { applicationStore } from '../../store-urls/entities/store-url.entity';
import { UserAgent } from 'src/main/user-agents/entities/user-agent.entity';
@Table
export class OperatingSystem extends Model {
  @Column({allowNull: false})
  declare os: string;

  @HasMany(() => applicationStore)
  declare store: applicationStore;

  @HasMany(() => UserAgent)
  userAgent: UserAgent;
}
