import { Model, Table, Column, ForeignKey, BelongsTo } from "sequelize-typescript";
import { SupplyAid } from "src/main/aids/entities/supply-aid.entity";
import { DemandAid } from "src/main/aids/entities/demand-aid.entity";
import { BundleStoreName } from "src/main/bundle-store-names/entities/bundle-store-name.entity";
@Table
export class Report extends Model {
    @Column
    requests: number;

    @Column
    impressions: number;

    @ForeignKey(()=> BundleStoreName)
    @Column
    bundle: number;

    @Column
    lastTime: Date;

    @BelongsTo(()=> BundleStoreName)
    bundleStoreName: BundleStoreName;

    @BelongsTo(()=> SupplyAid)
    supplyAid: SupplyAid;

    @BelongsTo(()=> DemandAid)
    demandAid: DemandAid;

    @ForeignKey(()=> SupplyAid)
    @Column
    supply_aid: number;

    @ForeignKey(()=> DemandAid)
    @Column
    demand_aid: number;
}
