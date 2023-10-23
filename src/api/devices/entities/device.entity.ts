import { Table, Column, Model, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { UserAgent } from 'src/api/user-agents/entities/user-agent.entity';
@Table
export class DeviceId extends Model {
  @Column
  deviceid: string;

  @ForeignKey(() => UserAgent)
  @Column
  declare userAgentId: number;

  @BelongsTo(() => UserAgent)
  userAgent: UserAgent;
}
