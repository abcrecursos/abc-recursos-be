import * as mongoose from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Donation } from './interfaces';
import { Model } from 'mongoose';
import { CreateDonationDto } from './dto/create-donation.dto';

import { OrdersService } from '../orders/orders.service';
import { Order } from '../orders/interfaces/Order';

import { TrackingNumberGeneratorService } from '../common';
import { DonationStates } from '../../constants/donationStates';

@Injectable()
export class DonationsService {
  constructor(
    @InjectModel('Donation') private donationModel: Model<Donation>,
    private trackingNumberGenerator: TrackingNumberGeneratorService
    ) {}

  async findAll(): Promise<Donation[]> {
    return this.donationModel.find().exec();
  }

  /**
  Finds a Donation by ID. Returns null if it does not
  exists.

  @param id ID of the donation.

  @returns A donation that matchs provided ID. null if it
  does not exists.
  */
  async findById(id:string):Promise<Donation>{


    try {
      //checks if 'id' can be converted to a valid ObjectID
      new mongoose.Types.ObjectId(id);
    }
    catch {
      return null;
    }

    return this.donationModel.findById(id).exec();
  }

  async findAllBySupplyId(supplyId: string):Promise<Donation[]>{
    return this.donationModel.find({'insumos.supply_id': new mongoose.Types.ObjectId(supplyId)}).exec();
  }

  async create(
    orderId: string,
    personId: string,
    items: {supplyId: string, quantity: number}[]
   ): Promise<Donation> {

    const objectId = new mongoose.Types.ObjectId();
    const trackingNumber = this.trackingNumberGenerator.generateFromObjectId(objectId.toHexString());

    let createdDonation = new this.donationModel({
      id: objectId,
      order: orderId,
      person: personId,
      items: items.map(function(current) {

        return {
          supply_id: current.supplyId,
          quantity: current.quantity
        };
      }),
      tracking: {
        number: trackingNumber,
        steps: [
          {
            order: 1,
            description: DonationStates.Pending
          }
        ]
      }
    });
    createdDonation = await createdDonation.save();

    createdDonation = await this.findById(createdDonation.id);
    return createdDonation
  }
}
