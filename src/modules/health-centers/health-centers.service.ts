import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HealthCenter } from './interfaces/HealthCenter';
import { Model } from 'mongoose';
import { CreateHealthCenterDto } from './dto/createHealthCenter.dto';
import { HealthCenterCategory } from './interfaces/HealthCenterCategory';
import { CreateHealthCenterCategoryDto } from './dto/createHealthCenterCategory.dto';
import { GetHealthCenterCategoriesDto } from './dto/getHealthCentersCategories.dto';
import { GetHealthCenterDto } from './dto/getHealthCenters.dto';
import * as mongoose from 'mongoose';

@Injectable()
export class HealthCentersService {
  constructor(
    @InjectModel('HealthCenter') private healthCenter: Model<HealthCenter>,
    @InjectModel('HealthCenterCategory')
    private healthCenterCategory: Model<HealthCenterCategory>,
  ) {}

  async findAll(): Promise<GetHealthCenterDto[]> {
    return this.healthCenter.find().exec();
  }

  async findAllByLocalityId(localidadId: number):Promise<GetHealthCenterDto[]>{
    return this.healthCenter.find({'address.locality_id': localidadId}).exec();
  }

  async findAllCategories(): Promise<GetHealthCenterCategoriesDto[]> {
    return this.healthCenterCategory.find({}).exec();
  }

  async create(
    createHealthCenterDto: CreateHealthCenterDto,
  ): Promise<HealthCenter> {
    const createdSupply = new this.healthCenter(createHealthCenterDto);
    return createdSupply.save();
  }

  async createCategory(
    createHealthCenterCategoryDto: CreateHealthCenterCategoryDto,
  ): Promise<HealthCenterCategory> {
    const createdHCCategory = new this.healthCenterCategory(
      createHealthCenterCategoryDto,
    );
    return createdHCCategory;
  }
}
