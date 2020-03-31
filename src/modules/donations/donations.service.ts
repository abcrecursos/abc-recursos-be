import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Donation } from './interfaces/Donation';
import { Model } from 'mongoose';
import { CreateDonationDto } from './dto/create-donation.dto';

@Injectable()
export class DonationsService {
  constructor(@InjectModel('Donation') private donationModel: Model<Donation>) {}

  async findAll(): Promise<Donation[]> {
    return this.donationModel.find().exec();
  }

  async create(createDonationDto: CreateDonationDto): Promise<Donation> {
    const createdDonation = new this.donationModel(createDonationDto);
    return createdDonation.save();
  }
}
