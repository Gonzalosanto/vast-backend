import { Test, TestingModule } from '@nestjs/testing';
import { StoreNamesController } from './store-names.controller';
import { StoreNamesService } from './store-names.service';

describe('StoreNamesController', () => {
  let controller: StoreNamesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoreNamesController],
      providers: [StoreNamesService],
    }).compile();

    controller = module.get<StoreNamesController>(StoreNamesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
