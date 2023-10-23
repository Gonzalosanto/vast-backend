import { Model, Table, Column, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { UserAgent } from 'src/api/user-agents/entities/user-agent.entity';
@Table
export class Uip extends Model {
  @Column
  uip: string;

  @ForeignKey(() => UserAgent)
  @Column
  declare userAgentId: number;

  @BelongsTo(() => UserAgent)
  userAgent: UserAgent;
}
