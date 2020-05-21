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
  //TODO revisar si se utiliza, tal vez se podría eliminar. Si se utiliza, cambiar el path porque coincide con getById
  @Get(':supplyId')
  getAllBySupplyId(@Param('supplyId') supplyId: string) {
    return this.donationsService.findAllBySupplyId(supplyId);
  }

  /**
  Finds an order and associated donations by order tracking number
  or a donation tracking number.

  @param trackingNumber Order or donation tracking number. If it is a
  donation tracking number, this method will find the associated order
  but no other donations.
  */
  @Get('tracking/:trackingNumber')
  async getByTrackingNumber(@Param('trackingNumber') trackingNumber: string) {

    /*
    order: OrderOuDto
    donations: [DonationOutDto...]
    */
    return new Promise(async (resolve, reject) => {

      
      let order = await this.ordersService.findByTrackingNumber(trackingNumber);
      let associatedDonations = [];

      if (order == null) {

        //Tracking number must be from a donation
        let donation = await this.donationsService.findByTrackingNumber(trackingNumber)

        //Can not find any model by tracking number
        if (donation == null) {
          reject(new NotFoundException());
          return;
        }

        //After donation model has been found, we get the associated orde model.
        order = await this.ordersService.findById(donation.order);

        //If not order model is found, NotFound is returned.
        if (order == null) {
          reject(new NotFoundException());
          return;
        }

        //Since tracking number is from a donation, only that model will be returned.
        associatedDonations = [donation];

      } else {

        //Find all donation models for that order.
        associatedDonations = await this.donationsService.findByOrderId(order.id);
      }

      if (associatedDonations == null) {
        associatedDonations = [];
      }

      resolve({
        order: new OrderOutDto(order, order.healthCenter.toString()),
        donations: associatedDonations.map(current => new DonationOutDto(current))
      });
    });
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
