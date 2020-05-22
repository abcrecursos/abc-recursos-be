import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Model } from 'mongoose';

import { TrackingNumberGeneratorService } from '../common';

import { Order } from './interfaces/Order';
import  { HealthCenterSuggestion } from './../orders/interfaces/HealthCenterSuggestion';

import { Person } from '../people/interfaces/person';
import { HealthCenter } from '../health-centers';
import { Tracking, TrackingStep } from './interfaces';

import { CreateOrderDto } from './dto/create-order.dto';

import { OrderStates } from '../../constants/orderStates';
import { PeopleService } from '../people';

import {LastThreeOrdersDto} from './dto/last-three-orders-out.dto';


@Injectable()
export class OrdersService {

  constructor(
    @InjectModel('Order') private orderModel: Model<Order>,
    @InjectModel('HealthCenter') private healthCenterModel: Model<HealthCenter>,
    private peopleService: PeopleService,
    private trackingNumberGenerator: TrackingNumberGeneratorService
) {}

  async findById(id: string): Promise<Order> {

    let finalId;

    //if (typeof id === "string") {
      try {
        //A invalid ID means that it was not found
        finalId = new mongoose.Types.ObjectId(id);  
      } catch(e) {
        console.log(e);
        return null;
      }
      
    //} else {
    //  finalId = id;
    //}

    return this.orderModel.findById(finalId).exec();
  }

  async findAll(): Promise<Order[]> {
    return this.orderModel.find().exec();
  }

  async create(createOrderDto: CreateOrderDto): Promise<Order> {


    const objectId = new mongoose.Types.ObjectId();
    const createdPerson = await this.peopleService.create(createOrderDto.person);
    const trackingNumber = this
                            .trackingNumberGenerator
                            .generateFromObjectId(objectId.toHexString());

    const items = createOrderDto.items.map(function(current) {
      return {
        supply: current.supplyId,
        quantity: current.quantity
      }
    });

    const createdOrder = new this.orderModel({
      _id: objectId,
      person_id: createdPerson.id,
      observations: createOrderDto.observations,
      priority: createOrderDto.priority,
      state: 'Requested',
      healthCenter: createOrderDto.healthCenterId,
      items: items,
      tracking: {
        number: trackingNumber,
        steps: [{description: OrderStates.Requested, order: 1}]
      }
    });



    return createdOrder.save();
  }


  async getNearSuggestionsBySupply(supplyId: string, longitude: number, latitude: number): Promise<HealthCenterSuggestion> {

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


  async findLastThreeOrdersforFrontPage(): Promise<LastThreeOrdersDto[]> {
    return this.orderModel.aggregate([

    { '$sort': { 'createdAt': -1
             }},
    { '$limit': 3 },
    {'$lookup':
       {
         'from': "healthcenters",
         'localField': "healthCenter_id",
         'foreignField': "_id",
         'as': "health_center"
       }},
     {'$lookup':
       {
         'from': "supplies",
         'localField': "items.supply_id",
         'foreignField': "_id",
         'as': "supplies"
       }}
    ,{'$project': {'nombre':   { '$arrayElemAt': [ '$health_center.name', 0 ] } ,'item':{'$arrayElemAt':['$supplies.name',0]},'cantidad':{'$arrayElemAt':['$items.quantity',0]},
                  'direccion': {'$concat': [{'$arrayElemAt': [ '$health_center.address.street', 0 ]}
                                           ,', '
                                           ,{'$arrayElemAt': [ '$health_center.address.city', 0 ]}
                                            ,', '
                                      ,{'$arrayElemAt': [ '$health_center.address.province', 0 ]}
                                           ]}
                  }}

      ]).exec();
  }

  async findByTrackingNumber(trackingNumber: string): Promise<Order> {

    return this
          .orderModel
          .findOne()
          .where("tracking.number")
          .equals(trackingNumber)
          .exec();
  }
}
