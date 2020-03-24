import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HealthCenter } from './interfaces/HealthCenter';
import { Model } from 'mongoose';
import { CreateHealthCenterDto } from './dto/createHealthCenter.dto';
import { HealthCenterCategory } from './interfaces/HealthCenterCategory';

@Injectable()
export class HealthCentersService {
  constructor(
    @InjectModel('HealthCenter') private healthCenter: Model<HealthCenter>,
    @InjectModel('HealthCenterCategory')
    private healthCenterCategory: Model<HealthCenterCategory>,
  ) {}

  async findAll(): Promise<HealthCenter[]> {
    return this.healthCenter.find().exec();
  }

  async findAllCategories(): Promise<HealthCenterCategory[]> {
    return this.healthCenterCategory.find().exec();
  }

  async create(
    createHealthCenterDto: CreateHealthCenterDto,
  ): Promise<HealthCenter> {
    const createdSupply = new this.healthCenter(createHealthCenterDto);
    return createdSupply.save();
  }
}
