import { Module } from '@nestjs/common';
import { ProducersController } from './producers.controller';
import { ProducersService } from './producers.service';
import { MongooseModule } from '@nestjs/mongoose';
import ProducerSchema from '../../database/schemas/producer.schema';
import ProducerCategorySchema from '../../database/schemas/producerCategory.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Producer', schema: ProducerSchema },
      { name: 'ProducerCategory', schema: ProducerCategorySchema },
    ]),
  ],
  controllers: [ProducersController],
  providers: [ProducersService],
})
export class ProducersModule {}
