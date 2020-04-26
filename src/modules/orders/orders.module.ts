import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import  OrderSchema   from "../../database/schemas/order.schema";
import  PersonSchema   from "../../database/schemas/person.schema";
import HealthCenterSchema from '../../database/schemas/healthCenter.schema';
import { OrderExists } from './validation';

import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { PeopleService } from '../people/people.service';

@Module({
  imports: [MongooseModule.forFeature([
  	{ name: 'Order', schema: OrderSchema },
  	{ name: 'Person', schema: PersonSchema },
  	{ name: 'HealthCenter', schema: HealthCenterSchema }
  	])],
  controllers: [OrdersController],
  providers: [OrdersService, PeopleService, OrderExists],
  exports: [OrdersService, OrderExists]
})
export class OrdersModule {}
