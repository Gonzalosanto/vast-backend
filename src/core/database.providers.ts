import { Sequelize } from 'sequelize-typescript';
const env = process.env.NODE_ENV || 'development';
import { applicationBundle } from '../main/bundles/entities/bundles.entity';
import { BundleStoreName } from 'src/main/bundle-store-names/entities/bundle-store-name.entity';
import { StoreNames } from 'src/main/store-names/entities/store-name.entity';
import { OperatingSystem } from 'src/main/operating-systems/entities/operating-system.entity';
import { applicationName } from 'src/main/names/entities/name.entity';
import { applicationStore } from 'src/main/store-urls/entities/store-url.entity';
import { DeviceId } from 'src/main/devices/entities/device.entity';
import { UserAgent } from 'src/main/user-agents/entities/user-agent.entity';
import { Uip } from 'src/main/uips/entities/uip.entity';
import { Report } from 'src/api/reports/entities/report.entity';
import { Whitelist } from 'src/api/whitelists/entities/whitelist.entity';
import { WhitelistMetadata } from 'src/api/whitelist_metadata/entities/whitelist_metadata.entity';
import { SupplyAid } from 'src/main/aids/entities/supply-aid.entity';
import { DemandAid } from 'src/main/aids/entities/demand-aid.entity';

const config = require(process.cwd() + '/src/config/config.json')[env];

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize(
        config.database,
        config.username,
        config.password,
        {"logging": false, ...config}
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
        DemandAid,
        Whitelist,
        WhitelistMetadata
      ]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
