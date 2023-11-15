import { Report } from './entities/report.entity';
import { SupplyAid } from '../../main/aids/entities/supply-aid.entity';
import { DemandAid } from '../../main/aids/entities/demand-aid.entity';

export const reportProvider = [
  {
    provide: 'REPORT_REPOSITORY',
    useValue: Report,
  },
];

export const supplyAid = [
    {
        provide: 'SUPPLY_REPOSITORY',
        useValue: SupplyAid
    },
];

export const demandAid = [
    {
        provide: 'DEMAND_REPOSITORY',
        useValue: DemandAid
    },
];