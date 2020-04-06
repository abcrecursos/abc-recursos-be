import { Test, TestingModule } from '@nestjs/testing';
import { ProducersController } from './producers.controller';

describe('Producers Controller', () => {
  let controller: ProducersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProducersController],
    }).compile();

    controller = module.get<ProducersController>(ProducersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
