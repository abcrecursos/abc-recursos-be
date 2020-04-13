import { Controller, Get, Query } from '@nestjs/common';
import { LocationsService } from './locations.service';

@Controller('locations')
export class LocationsController {
  constructor(private locationsSvc: LocationsService) {}

  @Get('provinces')
  findAllProvinces() {
    return this.locationsSvc.findAllProvinces();
  }

  @Get('departments')
  findAllDepartments(@Query('provinceId') id: string) {
    return this.locationsSvc.findAllDepartmentsByProvinceId(id);
  }

  @Get('localities')
  findAllLocalitiesByDepartmentId(@Query('departmentId') id: string) {
    return this.locationsSvc.findAllLocalitiesByDepartmentId(id);
  }

}
