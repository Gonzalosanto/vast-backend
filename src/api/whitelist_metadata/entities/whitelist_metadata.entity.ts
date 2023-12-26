import { Column, HasOne, Model, Table } from "sequelize-typescript";
import { Whitelist } from "src/api/whitelists/entities/whitelist.entity";

@Table
export class WhitelistMetadata extends Model {

    @Column({ autoIncrement: true, primaryKey: true })
    declare id_form: number;

    @Column
    declare tag: string;

    @Column
    declare minimum: number;

    @Column
    declare maximum: number;

    @Column
    declare type: string;

    @Column
    declare optimized: boolean;

    @Column
    declare notes: string;

    @Column
    declare enabled: boolean;

    @Column
    declare whitelisted: boolean;

    @HasOne(() => Whitelist)
    whitelist: Whitelist;
}
