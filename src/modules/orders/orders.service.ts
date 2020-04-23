import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './interfaces/Order';
import { Person } from '../people/interfaces/person';

import { Model } from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import * as mongoose from 'mongoose';



@Injectable()
export class OrdersService {
  constructor(@InjectModel('Order') private orderModel: Model<Order>,
  @InjectModel('Person')
  private personModel: Model<Person>,
) {}

  async findAll(): Promise<Order[]> {
    return this.orderModel.find().exec();
  }

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const createdPerson = new this.personModel(createOrderDto.person);
    const result=await createdPerson.save()
    console.log(result)

    const createdOrder = new this.orderModel({person_id: result.id,
    observations: createOrderDto.observations,
    priority: createOrderDto.priority,
    state: createOrderDto.state,
    healthCenter_id: createOrderDto.healthCenter_id,
    items: createOrderDto.items});
    return createdOrder.save();

  }
  }
