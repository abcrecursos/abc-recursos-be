import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Donation } from './interfaces/Donation';
import { Model } from 'mongoose';
import { CreateDonationDto } from './dto/create-donation.dto';
import * as mongoose from 'mongoose';


@Injectable()
export class DonationsService {
  constructor(@InjectModel('Donation') private donationModel: Model<Donation>) {}

  async findAll(): Promise<Donation[]> {
    return this.donationModel.find().exec();
  }
 
  async findAllBySupplyId(supplyId: string):Promise<Donation[]>{
    return this.donationModel.find({'insumos.supply_id': new mongoose.Types.ObjectId(supplyId)}).exec();
  }

  async create(createDonationDto: CreateDonationDto): Promise<Donation> {
    const createdDonation = new this.donationModel(createDonationDto);
    return createdDonation.save();
  }
}
