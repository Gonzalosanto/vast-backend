import { Sequelize } from 'sequelize-typescript';
const env = process.env.NODE_ENV || 'development';
import { applicationBundle } from '../api/bundles/bundles/entities/bundles.entity';
import { BundleStoreName } from 'src/api/bundles/bundle-store-names/entities/bundle-store-name.entity';
import { StoreNames } from 'src/api/bundles/store-names/entities/store-name.entity';

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
      sequelize.addModels([applicationBundle, BundleStoreName, StoreNames]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
