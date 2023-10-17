import { Model, Table, Column } from "sequelize-typescript";
@Table
export class Uip extends Model {
    @Column
    uip: string;
}
