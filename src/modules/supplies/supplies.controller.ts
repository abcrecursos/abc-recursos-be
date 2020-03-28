import { Controller, Get, Post, Body } from '@nestjs/common';
import { SuppliesService } from './supplies.service';
import { CreateSupplyDto } from './dto/create-supply.dto';

@Controller('supplies')
export class SuppliesController {
  constructor(private suppliesSvc: SuppliesService) {}
  @Get()
  getAll() {
    return this.suppliesSvc.findAll();
  }

  @Post()
  async create(@Body() createSupplyDto: CreateSupplyDto) {
    await this.suppliesSvc.create(createSupplyDto);
  }
}
