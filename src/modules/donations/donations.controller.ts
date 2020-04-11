import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { DonationsService } from './donations.service';
import { CreateDonationDto } from './dto/create-donation.dto';

@Controller('donations')
export class DonationsController {
  constructor(private donationsSvc: DonationsService) {}
  @Get()
  getAll() {
    return this.donationsSvc.findAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.donationsSvc.findById(id);
  }

  @Get(':supplyId')
  getAllBySupplyId(@Param('supplyId') supplyId: string) {
    return this.donationsSvc.findAllBySupplyId(supplyId);
  }

  @Post()
  async create(@Body() createDonationDto: CreateDonationDto) {
    return await this.donationsSvc.create(createDonationDto);
  }
}
