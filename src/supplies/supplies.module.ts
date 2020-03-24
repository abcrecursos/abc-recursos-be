import { Module } from '@nestjs/common';
import { SuppliesController } from './supplies.controller';
import { SuppliesService } from './supplies.service';
import { MongooseModule } from '@nestjs/mongoose';
import SupplySchema from 'src/schemas/supply.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Supply', schema: SupplySchema }])],
  controllers: [SuppliesController],
  providers: [SuppliesService],
})
export class SuppliesModule {}
