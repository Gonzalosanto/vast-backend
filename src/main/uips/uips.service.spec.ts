import { Test, TestingModule } from '@nestjs/testing';
import { UipsService } from './uips.service';

describe('UipsService', () => {
  let service: UipsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UipsService],
    }).compile();

    service = module.get<UipsService>(UipsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
