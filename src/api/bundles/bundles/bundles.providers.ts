import { applicationBundle } from './entities/bundles.entity';
import { BUNDLE_REPOSITORY } from 'src/constants';

export const bundlesProviders = [
  {
    provide: BUNDLE_REPOSITORY,
    useValue: applicationBundle,
  },
];
