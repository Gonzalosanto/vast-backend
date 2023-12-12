import { Table, Column, Model, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { UserAgent } from 'src/main/user-agents/entities/user-agent.entity';
@Table
export class DeviceId extends Model {
  @Column({unique: true})
  declare deviceid: string;

  @ForeignKey(() => UserAgent)
  @Column
  declare userAgentId: number;

  @BelongsTo(() => UserAgent)
  userAgent: UserAgent;
}
