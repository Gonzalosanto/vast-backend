import { Test, TestingModule } from '@nestjs/testing';
import { BundleStoreNamesService } from './bundle-store-names.service';

describe('BundleStoreNamesService', () => {
  let service: BundleStoreNamesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BundleStoreNamesService],
    }).compile();

    service = module.get<BundleStoreNamesService>(BundleStoreNamesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
