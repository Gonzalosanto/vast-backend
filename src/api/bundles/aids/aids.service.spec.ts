import { Test, TestingModule } from '@nestjs/testing';
import { AidsService } from './aids.service';

describe('AidsService', () => {
  let service: AidsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AidsService],
    }).compile();

    service = module.get<AidsService>(AidsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
