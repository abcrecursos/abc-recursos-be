import { Controller, Get, Post, Body } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { CreateOrganizationsDto } from './dto/create-organizations.dto';

@Controller('entities/organizations')
export class OrganizationsController {
  constructor(private Organizationsvc: OrganizationsService) {}

  // @Get()
  // async findAll() {
  //   return this.Organizationsvc.findAll();
  // }

  @Post()
  async createHealthCenter(@Body() createHC: CreateOrganizationsDto) {
    return this.Organizationsvc.create(createHC);
  }
}
