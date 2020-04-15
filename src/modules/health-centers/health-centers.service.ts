import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HealthCenter } from './interfaces/HealthCenter';
import { LocalitiesRefes } from './interfaces/LocalitiesRefes';
import { Model } from 'mongoose';
import { CreateHealthCenterDto } from './dto/createHealthCenter.dto';
import { HealthCenterCategory } from './interfaces/HealthCenterCategory';
import { CreateHealthCenterCategoryDto } from './dto/createHealthCenterCategory.dto';
import { GetHealthCenterCategoriesDto } from './dto/getHealthCentersCategories.dto';
import { GetLocalitiesDto } from './dto/getLocalities.dto';
import { GetHealthCenterDto } from './dto/getHealthCenters.dto';
import * as mongoose from 'mongoose';

@Injectable()
export class HealthCentersService {
  constructor(
    @InjectModel('HealthCenter') private healthCenter: Model<HealthCenter>,
    @InjectModel('HealthCenterCategory')
    private healthCenterCategory: Model<HealthCenterCategory>,
    @InjectModel('LocalitiesRefes')
    private localitiesRefes: Model<LocalitiesRefes>,
  ) {}

  async findAll(): Promise<GetHealthCenterDto[]> {
    return this.healthCenter.find().exec();
  }

  async findAllByLocalityId(localidadId: string):Promise<GetHealthCenterDto[]>{
    return this.healthCenter.find({'address.locality_id': localidadId}).exec();
  }

 // este metodo adhoc para buscar localidades dentro de la base de REFES
  async findAllLocalitiesByProvinceId(provinceId: string):Promise<GetLocalitiesDto[]>{

    return this.healthCenter.aggregate([{ '$match': { "address.province_id": provinceId } },{ '$group': { '_id': "$address.locality_id", 'localidad': { '$first': "$address.city" } } }, {"$sort": {"localidad": 1}}]).exec();

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
