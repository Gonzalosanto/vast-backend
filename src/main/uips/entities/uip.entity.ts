import { Model, Table, Column, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { UserAgent } from 'src/main/user-agents/entities/user-agent.entity';
@Table
export class Uip extends Model {
  @Column({unique: true})
  declare uip: string;

  @ForeignKey(() => UserAgent)
  @Column
  declare userAgentId: number;

  @BelongsTo(() => UserAgent)
  userAgent: UserAgent;
}
