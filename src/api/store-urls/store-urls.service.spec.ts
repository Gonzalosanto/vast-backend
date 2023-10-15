import { Test, TestingModule } from '@nestjs/testing';
import { StoreUrlsService } from './store-urls.service';

describe('StoreUrlsService', () => {
  let service: StoreUrlsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StoreUrlsService],
    }).compile();

    service = module.get<StoreUrlsService>(StoreUrlsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
