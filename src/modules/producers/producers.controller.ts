import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProducersService } from './producers.service';
import { CreateProducerCategoryDto } from './dto/createProducerCategory.dto';
import { CreateProducerDto } from './dto/createProducer.dto';

@Controller('producers')
export class ProducersController {
  constructor(private ProducerSvc: ProducersService) {}

  @Get()
  async findAll() {
    return this.ProducerSvc.findAll();
  }

  @Post()
  async createProducer(@Body() createP: CreateProducerDto) {
    return this.ProducerSvc.create(createP);
  }

  @Get('/categories')
  async findAllCategories() {
    return this.ProducerSvc.findAllCategories();
  }

  @Post('/categories')
  async createProducerCategory(
    @Body() createPCategory: CreateProducerCategoryDto,
  ) {
    return this.ProducerSvc.createCategory(createPCategory);
  }
}
