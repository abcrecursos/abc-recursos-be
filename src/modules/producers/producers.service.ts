import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Producer } from './interfaces/producer';
import { Person } from '../people/interfaces/person';

import { Model } from 'mongoose';
import { CreateProducerDto } from './dto/createProducer.dto';
import { ProducerCategory } from './interfaces/producerCategory';
import { CreateProducerCategoryDto } from './dto/createProducerCategory.dto';
import { GetProducerCategoriesDto } from './dto/getProducersCategories.dto';
import { GetProducersSummaryDto } from './dto/getProducersSummary.dto';
import { GetProducerDto } from './dto/getProducers.dto';

@Injectable()
export class ProducersService {
  constructor(
    @InjectModel('Producer') private Producer: Model<Producer>,
    @InjectModel('ProducerCategory')
    private ProducerCategory: Model<ProducerCategory>,
    @InjectModel('Person')
    private personModel: Model<Person>,

  ) {}

  async findAll(): Promise<GetProducerDto[]> {
    return this.Producer.find().exec();
  }

  async findAllCategories(): Promise<GetProducerCategoriesDto[]> {
    return this.ProducerCategory.find({}).exec();
  }


  async findAllSummary(): Promise<GetProducersSummaryDto[]> {
    return this.Producer.aggregate([

    {'$project': {'nombre':'$name',
                  'insumos':{ '$reduce':{'input':'$supply.name','initialValue': "",
       'in': { '$concat' : ['$$value',

                            { '$cond': { 'if': { '$eq': [ "$$value", "" ] }, 'then': " ", 'else': ", " }},

                            '$$this'] }}},
                  'ciudad':{'$concat': ['$address.localidad', ', ', '$address.province']}}}
]).exec();
  }


  async create(createProducerDto: CreateProducerDto): Promise<Producer> {

    const createdPerson = new this.personModel(createProducerDto.person);
    const result=await createdPerson.save()
   //console.log(result)

    const createdProducer = new this.Producer({person_id: result.id,
    user_id: result.user_id,
    name: createProducerDto.name,
    cuit: createProducerDto.cuit,
    description: createProducerDto.description,
    address: createProducerDto.address,
    phone: createProducerDto.phone,
    supply: createProducerDto.supply});

    return createdProducer.save();
  }

  async createCategory(createProducerCategoryDto: CreateProducerCategoryDto): Promise<ProducerCategory> {
    const createdHCCategory = new this.ProducerCategory(createProducerCategoryDto);
    return createdHCCategory;
  }
}
