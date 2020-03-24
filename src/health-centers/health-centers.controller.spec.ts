import { Test, TestingModule } from '@nestjs/testing';
import { HealthCentersController } from './health-centers.controller';

describe('HealthCenters Controller', () => {
  let controller: HealthCentersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthCentersController],
    }).compile();

    controller = module.get<HealthCentersController>(HealthCentersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
