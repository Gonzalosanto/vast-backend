import { Test, TestingModule } from '@nestjs/testing';
import { OperatingSystemsController } from './operating-systems.controller';
import { OperatingSystemsService } from './operating-systems.service';

describe('OperatingSystemsController', () => {
  let controller: OperatingSystemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OperatingSystemsController],
      providers: [OperatingSystemsService],
    }).compile();

    controller = module.get<OperatingSystemsController>(
      OperatingSystemsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
