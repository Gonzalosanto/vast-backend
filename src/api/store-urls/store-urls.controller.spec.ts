import { Test, TestingModule } from '@nestjs/testing';
import { StoreUrlsController } from './store-urls.controller';
import { StoreUrlsService } from './store-urls.service';

describe('StoreUrlsController', () => {
  let controller: StoreUrlsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoreUrlsController],
      providers: [StoreUrlsService],
    }).compile();

    controller = module.get<StoreUrlsController>(StoreUrlsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
