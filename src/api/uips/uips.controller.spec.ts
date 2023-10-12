import { Test, TestingModule } from '@nestjs/testing';
import { UipsController } from './uips.controller';
import { UipsService } from './uips.service';

describe('UipsController', () => {
  let controller: UipsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UipsController],
      providers: [UipsService],
    }).compile();

    controller = module.get<UipsController>(UipsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
