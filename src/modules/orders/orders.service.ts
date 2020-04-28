import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './interfaces/Order';
import  { HealthCenterSuggestionDto } from './../donations/dto/health-center-suggestion.dto';


import { Person } from '../people/interfaces/person';
import { HealthCenter } from '../health-centers';

import { Model } from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import * as mongoose from 'mongoose';



@Injectable()
export class OrdersService {

  constructor(
    @InjectModel('Order') private orderModel: Model<Order>,
    @InjectModel('Person') private personModel: Model<Person>,
    @InjectModel('HealthCenter') private healthCenterModel: Model<HealthCenter>
) {}

  async findById(id: string): Promise<Order> {
    return this.orderModel.findById(id).exec();
  }

  async findAll(): Promise<Order[]> {
    return this.orderModel.find().exec();
  }

  async create(createOrderDto: CreateOrderDto): Promise<Order> {

    const createdPerson = new this.personModel(createOrderDto.person);
    const result = await createdPerson.save()

    const createdOrder = new this.orderModel({
      person_id: result.id,
      observations: createOrderDto.observations,
      priority: createOrderDto.priority,
      state: createOrderDto.state,
      healthCenter_id: createOrderDto.healthCenter_id,
      items: createOrderDto.items
    });

    return createdOrder.save();
  }

  async getNearSuggestionsBySupply(supplyId: string, longitude: number, latitude: number): Promise<Order> {

      let geoPoint = {
        type: 'point',
        'coordinates': [longitude, latitude]
      };

      let id = new mongoose.Types.ObjectId(supplyId);

      return new Promise(async function(resolve, reject) {

        let models = await this
          .healthCenterModel
          .aggregate([
            {
              '$geoNear': {
                'near': geoPoint,
                'distanceField': "dist.calculated",
                'maxDistance': 100000,
                'includeLocs': "dist.location",
                'spherical': true
              }
            },
            {
              '$lookup': {
                'from': "orders",
                'let': { 'health_id': "$_id" },
                'pipeline': [
                  {'$match': {"state":"Pending","items": {'$elemMatch': {"supply_id": id}}}},
                  {'$match': { '$expr': { '$eq': [ "$healthCenter_id",  "$$health_id" ] }}}
                ],
                'as': "order"
              }
            },
            {
              "$match": {
                "order.0": {
                  "$exists": true
                }
              }
            }
          ])
          .exec();

          let ordersId =
            models
            .map(function(current) {
              return current.order;
            })
            .reduce(function(acumulator, currentArray) {
              return acumulator.concat(currentArray);
            },
            [])
            .map(currentOrder => currentOrder._id);

          console.log(ordersId);
          resolve(await this.orderModel.find({'_id': {'$in': ordersId}}).populate('healthCenter_id').exec());

      }.bind(this));}




  async getNearSuggestionsBySupplyPrueba(supplyId: string, longitude: number, latitude: number): Promise<HealthCenterSuggestionDto[]> {

        let geoPoint = {
          type: 'point',
          'coordinates': [longitude, latitude]
        };

        let id = new mongoose.Types.ObjectId(supplyId);

        return  this.healthCenterModel
            .aggregate([
              {
                '$geoNear': {
                  'near': geoPoint,
                  'distanceField': "dist.calculated",
                  'maxDistance': 100000,
                  'includeLocs': "dist.location",
                  'spherical': true
                }
              },
              {
                '$lookup': {
                  'from': "orders",
                  'let': { 'health_id': "$_id" },
                  'pipeline': [
                    {'$match': {"state":"Pending","items": {'$elemMatch': {"supply_id": id}}}},
                    {'$match': { '$expr': { '$eq': [ "$healthCenter_id",  "$$health_id" ] }}}
                  ],
                  'as': "order"
                }
              },
              {
                "$match": {
                  "order.0": {
                    "$exists": true
                  }
                }
              }
            ])
            .exec();

      }





  async exists(orderId: string): Promise<boolean> {

    return await this.findById(orderId) != null;
  }





}
