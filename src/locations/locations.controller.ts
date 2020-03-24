import { Controller, Get } from '@nestjs/common';
import { LocationsService } from './locations.service';

@Controller('locations')
export class LocationsController {

    constructor(private locationsSvc: LocationsService) {}

  @Get('provinces')
  findAllProvinces() {
    return this.locationsSvc.findAllProvinces().catch(e => console.log('error ', e))
  }

  @Get('departments')
  findAllDepartments() {
    return this.locationsSvc.findAllProvinces();
  }
}
