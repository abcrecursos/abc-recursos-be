import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Supply } from './interfaces/Supply';
import { Model } from 'mongoose';
import { CreateSupplyDto } from './dto/create-supply.dto';

@Injectable()
export class SuppliesService {
  constructor(@InjectModel('Supply') private supplyModel: Model<Supply>) {}

  async findAll(): Promise<Supply[]> {
    return this.supplyModel.find().exec();
  }

  async create(createSupplyDto: CreateSupplyDto): Promise<Supply> {
    const createdSupply = new this.supplyModel(createSupplyDto);
    return createdSupply.save();
  }

  /**
  Verifies if a supply exists.

  id Supply ID.

  Returns a promise that will resolve to true if supply exists, false otherwise.
  */
  async exists(id: string): Promise<boolean> {

    return new Promise(async (resolve, reject) => {

      this
      .supplyModel
      .findById(id)
      .then(model => resolve(model != null))
      .catch(reject);
    });
  }
}
