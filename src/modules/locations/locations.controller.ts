import { Controller, Get, Query, Param } from '@nestjs/common';
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

  @Get('localitiesbydepartment/:departmentId')
  findAllLocalitiesByDepartmentId(@Param('departmentId') id: string) {
  return this.locationsSvc.findAllLocalitiesByDepartmentId(id);
  }

  @Get('localitiesbyprovince/:provinceId')
  findAllLocalitiesByProvinceId(@Param('provinceId') id: string) {
    return this.locationsSvc.findAllLocalitiesByProvinceId(id);
  }

  @Get('address/:address')
  geocodeAddress(@Param('address') address: string) {
    return this.locationsSvc.geocodeAddress(address);
  }


}
