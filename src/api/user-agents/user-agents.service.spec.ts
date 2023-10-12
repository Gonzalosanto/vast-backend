import { Test, TestingModule } from '@nestjs/testing';
import { UserAgentsService } from './user-agents.service';

describe('UserAgentsService', () => {
  let service: UserAgentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserAgentsService],
    }).compile();

    service = module.get<UserAgentsService>(UserAgentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
