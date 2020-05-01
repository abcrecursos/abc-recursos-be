import * as mongoose from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Donation } from './interfaces/Donation';
import { Model } from 'mongoose';
import { CreateDonationDto } from './dto/create-donation.dto';

import { OrdersService } from '../orders/orders.service';
import { Order } from '../orders/interfaces/Order';

@Injectable()
export class DonationsService {
  constructor(@InjectModel('Donation') private donationModel: Model<Donation>) {}

  async findAll(): Promise<Donation[]> {
    return this.donationModel.find().exec();
  }

  async findById(id:string):Promise<Donation>{
    return this.donationModel.findById(id).exec();
  }

  async findAllBySupplyId(supplyId: string):Promise<Donation[]>{
    return this.donationModel.find({'insumos.supply_id': new mongoose.Types.ObjectId(supplyId)}).exec();
  }

  async create(createDonationDto: CreateDonationDto): Promise<Donation> {

    let createdDonation = new this.donationModel(createDonationDto);
    createdDonation = await createdDonation.save();

    createdDonation = await this.findById(createdDonation.id);
    return createdDonation
  }

  async findNearbyOrdersForSupply(
    supplyId: string,
    latitude: string,
    longitude: string
    ): Promise<Order[]> {

    return null;
  }



}
