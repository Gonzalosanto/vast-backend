import { Test, TestingModule } from '@nestjs/testing';
import { StoreNamesService } from './store-names.service';

describe('StoreNamesService', () => {
  let service: StoreNamesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StoreNamesService],
    }).compile();

    service = module.get<StoreNamesService>(StoreNamesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
