import { Test, TestingModule } from '@nestjs/testing';
import { HealthCentersService } from './health-centers.service';

describe('HealthCentersService', () => {
  let service: HealthCentersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HealthCentersService],
    }).compile();

    service = module.get<HealthCentersService>(HealthCentersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
