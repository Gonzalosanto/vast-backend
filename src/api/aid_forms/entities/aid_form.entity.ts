import { Column, ForeignKey, HasMany, HasOne, Model, Table } from "sequelize-typescript";
import { Whitelist } from "src/api/whitelists/entities/whitelist.entity";

@Table
export class AidForm extends Model {

    @Column({autoIncrement:true,primaryKey: true})
    id_form:number;

    @Column
    tag:string;

    @Column
    min:number;

    @Column
    max:number;

    @Column
    type:string;

    @Column
    optimize:boolean;

    @Column
    wl:boolean;

    @HasMany (() => Whitelist)
    whitelist: Whitelist[];
}
