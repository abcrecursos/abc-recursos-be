import { Controller, Get, Post, Body, Put, Res, Param, NotFoundException, HttpStatus } from '@nestjs/common';
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

  @Get('/summary')
  async findAllSummary() {
    return this.ProducerSvc.findAllSummary();
  }


  @Post()
  async createProducer(@Body() createP: CreateProducerDto) {
    return this.ProducerSvc.create(createP);
  }


  @Put('/update/:producerID')
  async updateProducer(@Res() res, @Body() createProducerDto: CreateProducerDto, @Param('producerID') producerID: string) {
    const updatedProducer= await this.ProducerSvc.updateProducer(producerID,createProducerDto);
    if (!updatedProducer) throw new NotFoundException("Producer does not exist");
    return res.status(HttpStatus.OK).json({message:'Producer Updated Successfully',
    updatedProducer

  });

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
