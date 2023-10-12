import { Test, TestingModule } from '@nestjs/testing';
import { UserAgentsController } from './user-agents.controller';
import { UserAgentsService } from './user-agents.service';

describe('UserAgentsController', () => {
  let controller: UserAgentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserAgentsController],
      providers: [UserAgentsService],
    }).compile();

    controller = module.get<UserAgentsController>(UserAgentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
