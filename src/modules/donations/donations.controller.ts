import { Controller, Get, Post, Body, Param, NotFoundException } from '@nestjs/common';

import { DonationsService } from './donations.service';
import { OrdersService } from '../orders';
import { CreateDonationDto } from './dto/create-donation.dto';

import { TrackingOutDto, OrdersSuggestionsDto, DonationOutDto, OrderOutDto } from './dto';
import { Tracking, Donation } from './interfaces';
import { HealthCenterSuggestionDto } from './dto/health-center-suggestion.dto';
import { PeopleService } from '../people';


@Controller('donations')
export class DonationsController {

  constructor(
    private donationsService: DonationsService,
    private ordersService: OrdersService,
    private peopleService: PeopleService
   ) {}

  @Get()
  async getAll(): Promise<DonationOutDto[]> {

    const models = await this.donationsService.findAll();
    return models.map(current => new DonationOutDto(current));
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<DonationOutDto> {
    
    const model = await this.donationsService.findById(id);

    if (model == null) {
      throw new NotFoundException();
    }

    return new DonationOutDto(model);
  }

  //FIXME Arreglar para que retorne Tracking en lugar de Donation
  @Get(':supplyId')
  getAllBySupplyId(@Param('supplyId') supplyId: string) {
    return this.donationsService.findAllBySupplyId(supplyId);
  }

  @Post()
  async create(@Body() createDonationDto: CreateDonationDto): Promise<DonationOutDto> {

    //TODO ¿envíar correo cuando se haya creado la donación?
    //TODO si ocurre un error al generar el tracking, eliminar la donacion

    const personId = (await this.peopleService.create(createDonationDto.person))._id;

    const items = createDonationDto
                  .items
                  .map(function(current) {
                    return {supplyId: current.supplyId, quantity: current.quantity} ;
                  });

    let donationModel = await this.donationsService.create(
        createDonationDto.orderId,
        personId,
        items
      );

    //let trackingModel = await this.trackingService.create(donationModel);

    return new DonationOutDto(donationModel); //new TrackingOutDto(trackingModel, donationModel);
  }

  @Post('/suggestions')
  async getOrdersSuggestionsBySupply(@Body() ordersSuggestionsDto: OrdersSuggestionsDto)
  : Promise<HealthCenterSuggestionDto> {
    return this.ordersService.getNearSuggestionsBySupply(
      ordersSuggestionsDto.supplyId,
      ordersSuggestionsDto.longitude,
      ordersSuggestionsDto.latitude);
  }
}
