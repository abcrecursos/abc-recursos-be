import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { DonationsService } from './donations.service';
import { TrackingService } from './tracking.service';
import { OrdersService } from '../orders';
import { CreateDonationDto } from './dto/create-donation.dto';

import { TrackingOutDto, OrdersSuggestionsDto, DonationOutDto, OrderOutDto } from './dto';
import { Tracking, Donation } from './interfaces';
import { Order } from '../orders';
import { HealthCenter } from '../health-centers';
import { HealthCenterSuggestionDto } from './dto/health-center-suggestion.dto';


@Controller('donations')
export class DonationsController {

  constructor(
    private donationsService: DonationsService,
    private trackingService: TrackingService,
    private ordersService: OrdersService
   ) {}

  @Get()
  async getAll(): Promise<TrackingOutDto[]> {

    const models: Tracking[] = await this.trackingService.findAll();


    return models.map(function(current): TrackingOutDto {

      const donation: any = current["donation_id"];
      console.log(current);
      if (donation as Donation) {
        return new TrackingOutDto(current, donation);
      } else {
        return new TrackingOutDto(current, donation.toString());
      }

    });
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.trackingService.findByDonationId(id);
  }

  //FIXME Arreglar para que retorne Tracking en lugar de Donation
  @Get(':supplyId')
  getAllBySupplyId(@Param('supplyId') supplyId: string) {
    return this.donationsService.findAllBySupplyId(supplyId);
  }

  //TODO determinar un modelo a retornar. Este debe ser el mismo que getAll y getById.
  @Post()
  async create(@Body() createDonationDto: CreateDonationDto): Promise<TrackingOutDto> {

    //TODO ¿envíar correo cuando se haya creado la donación?
    //TODO si ocurre un error al generar el tracking, eliminar la donacion
    let donationModel = await this.donationsService.create(createDonationDto);
    let trackingModel = await this.trackingService.create(donationModel);

    return new TrackingOutDto(trackingModel, donationModel);
  }




  @Post('/suggestions')
  async getOrdersSuggestionsBySupply(@Body() ordersSuggestionsDto: OrdersSuggestionsDto)  : Promise<HealthCenterSuggestionDto> {
    return this.ordersService.getNearSuggestionsBySupply(ordersSuggestionsDto.supplyId,
          ordersSuggestionsDto.longitude,
          ordersSuggestionsDto.latitude);
  }

  //@Post('/suggestions')
  //async getOrdersSuggestionsBySupply(@Body() ordersSuggestionsDto: OrdersSuggestionsDto)  : Promise<HealthCenterSuggestionDto[]> {
  //  return this.ordersService.getNearSuggestionsBySupply(ordersSuggestionsDto.supplyId,
  //        ordersSuggestionsDto.longitude,
  //        ordersSuggestionsDto.latitude);
  //}


}
