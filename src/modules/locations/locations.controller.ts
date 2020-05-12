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

    address = address
            .replace("á", "a")
            .replace("é", "e")
            .replace("í", "i")
            .replace("ó", "o")
            .replace("ú", "u")

    return this.locationsSvc.geocodeAddress(address);
  }
}
