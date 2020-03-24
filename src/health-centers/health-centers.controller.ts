import { Controller, Get } from '@nestjs/common';
import { HealthCentersService } from './health-centers.service';

@Controller('health-centers')
export class HealthCentersController {
  constructor(private healthCenterSvc: HealthCentersService) {}

  @Get('categories')
  async findAllCategories() {
    return this.healthCenterSvc.findAllCategories();
  }
}
