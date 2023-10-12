import { Test, TestingModule } from '@nestjs/testing';
import { AidsController } from './aids.controller';
import { AidsService } from './aids.service';

describe('AidsController', () => {
  let controller: AidsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AidsController],
      providers: [AidsService],
    }).compile();

    controller = module.get<AidsController>(AidsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
