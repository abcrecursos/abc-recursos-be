import { Module } from '@nestjs/common';
import { SuppliesController } from './supplies.controller';
import { SuppliesService } from './supplies.service';
import { MongooseModule } from '@nestjs/mongoose';
import SupplySchema from '../../database/schemas/supply.schema';
import { SupplyExists } from './';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Supply', schema: SupplySchema }])],
  controllers: [SuppliesController],
  providers: [SuppliesService, SupplyExists],
  exports: [SuppliesService, SupplyExists]
})
export class SuppliesModule {}
