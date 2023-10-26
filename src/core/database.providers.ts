import { Sequelize } from 'sequelize-typescript';
const env = process.env.NODE_ENV || 'development';
import { applicationBundle } from '../api/bundles/entities/bundles.entity';
import { BundleStoreName } from 'src/api/bundle-store-names/entities/bundle-store-name.entity';
import { StoreNames } from 'src/api/store-names/entities/store-name.entity';
import { OperatingSystem } from 'src/api/operating-systems/entities/operating-system.entity';
import { applicationName } from 'src/api/names/entities/name.entity';
import { applicationStore } from 'src/api/store-urls/entities/store-url.entity';
import { DeviceId } from 'src/api/devices/entities/device.entity';
import { UserAgent } from 'src/api/user-agents/entities/user-agent.entity';
import { Uip } from 'src/api/uips/entities/uip.entity';
import { Report } from 'src/api/reports/entities/report.entity';
import { SupplyAid } from 'src/api/aids/entities/supply-aid.entity';
import { DemandAid } from 'src/api/aids/entities/demand-aid.entity';

const config = require(process.cwd() + '/src/config/config.json')[env];

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize(
        config.database,
        config.username,
        config.password,
        config,
      );
      sequelize.addModels([
        applicationBundle, 
        BundleStoreName, 
        StoreNames, 
        DeviceId, 
        UserAgent, 
        Uip, 
        OperatingSystem, 
        applicationName, 
        applicationStore,
        Report,
        SupplyAid,
        DemandAid
      ]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
