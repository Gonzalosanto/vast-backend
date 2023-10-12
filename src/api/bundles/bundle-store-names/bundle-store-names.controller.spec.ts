import { Test, TestingModule } from '@nestjs/testing';
import { BundleStoreNamesController } from './bundle-store-names.controller';
import { BundleStoreNamesService } from './bundle-store-names.service';

describe('BundleStoreNamesController', () => {
  let controller: BundleStoreNamesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BundleStoreNamesController],
      providers: [BundleStoreNamesService],
    }).compile();

    controller = module.get<BundleStoreNamesController>(
      BundleStoreNamesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
