import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Producer } from './interfaces/producer';
import { Model } from 'mongoose';
import { CreateProducerDto } from './dto/createProducer.dto';
import { ProducerCategory } from './interfaces/producerCategory';
import { CreateProducerCategoryDto } from './dto/createProducerCategory.dto';
import { GetProducerCategoriesDto } from './dto/getProducersCategories.dto';
import { GetProducerDto } from './dto/getProducers.dto';

@Injectable()
export class ProducersService {
  constructor(
    @InjectModel('Producer') private Producer: Model<Producer>,
    @InjectModel('ProducerCategory')
    private ProducerCategory: Model<ProducerCategory>,
  ) {}

  async findAll(): Promise<GetProducerDto[]> {
    return this.Producer.find().exec();
  }

  async findAllCategories(): Promise<GetProducerCategoriesDto[]> {
    return this.ProducerCategory.find({}).exec();
  }

  async create(createProducerDto: CreateProducerDto): Promise<Producer> {
    const createdSupply = new this.Producer(createProducerDto);
    return createdSupply.save();
  }

  async createCategory(
    createProducerCategoryDto: CreateProducerCategoryDto,
  ): Promise<ProducerCategory> {
    const createdHCCategory = new this.ProducerCategory(
      createProducerCategoryDto,
    );
    return createdHCCategory;
  }
}
