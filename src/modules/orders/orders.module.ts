import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import  OrderSchema   from "../../database/schemas/order.schema";
import  AddressSchema   from "../../database/schemas/address.schema";
import  PhoneSchema   from "../../database/schemas/phone.schemas";

import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';


@Module({
  imports: [MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema },
  { name: 'Address', schema: AddressSchema },
  { name: 'Phone', schema: PhoneSchema }])],
  controllers: [OrdersController],
  providers: [OrdersService]
})
export class OrdersModule {}
