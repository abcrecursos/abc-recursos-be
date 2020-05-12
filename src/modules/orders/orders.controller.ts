import { Controller, Get, Post, Body } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';


@Controller('orders')
export class OrdersController {
  constructor(private OrderSvc: OrdersService) {}

  @Get()
  async findAll() {
    return this.OrderSvc.findAll();
  }

  @Post()
  async createOrder(@Body() createO: CreateOrderDto) {
    return await this.OrderSvc.create(createO);
  }
}
