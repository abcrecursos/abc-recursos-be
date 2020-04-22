import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import  OrderSchema   from "../../database/schemas/order.schema";
import  PersonSchema   from "../../database/schemas/person.schema";

import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { PeopleService } from '../people/people.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema },
  { name: 'Person', schema: PersonSchema }])],
  controllers: [OrdersController],
  providers: [OrdersService, PeopleService]
})
export class OrdersModule {}
