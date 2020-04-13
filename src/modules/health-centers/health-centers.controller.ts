import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { HealthCentersService } from './health-centers.service';
import { CreateHealthCenterCategoryDto } from './dto/createHealthCenterCategory.dto';
import { CreateHealthCenterDto } from './dto/createHealthCenter.dto';

@Controller('health-centers')
export class HealthCentersController {
  constructor(private healthCenterSvc: HealthCentersService) {}

  @Get()
  async findAll() {
    return this.healthCenterSvc.findAll();
  }

  @Get('localities')
  async findAllByLocalityId(@Query('localityId') localityId: number) {
    return this.healthCenterSvc.findAllByLocalityId(localityId);
  }

  @Post()
  async createHealthCenter(@Body() createHC: CreateHealthCenterDto) {
    return this.healthCenterSvc.create(createHC);
  }

  @Get('/categories')
  async findAllCategories() {
    return this.healthCenterSvc.findAllCategories();
  }

  @Post('/categories')
  async createHealthCenterCategory(
    @Body() createHCCategory: CreateHealthCenterCategoryDto,
  ) {
    return this.healthCenterSvc.createCategory(createHCCategory);
  }
}
