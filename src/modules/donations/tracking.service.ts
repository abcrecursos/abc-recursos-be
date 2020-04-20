import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Donation } from './interfaces/Donation';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';

import { Tracking } from './interfaces/tracking';
import { TrackingStep } from './interfaces/TrackingStep';
import { DonationStates } from '../../constants/donationStates';

class TrackingStepDto {
  readonly description: String;
  readonly order: Number;

  constructor(description: String, order: Number) {
    this.description = description;
    this.order = order;
  }
}

class TrackingDto {
  readonly number: String;
  readonly donation_id: any;
  readonly steps: TrackingStepDto[];

  constructor(number: String, donation: Donation, steps: TrackingStepDto[]) {
    this.number = number;
    this.donation_id = donation.id;
    this.steps = steps;
  }
}

@Injectable()
export class TrackingService {
  constructor(
    @InjectModel('Tracking') private trackingModel: Model<Tracking>,
    @InjectModel('TrackingStep') private trackingStepModel: Model<TrackingStep>
  ) {}

  /**
  Generates a unique tracking number.

  @param referenceId - ID to use as reference to create the tracking number.

  @returns a unique tracking number.
  */
  private generateTrackingNumber(referenceId: string): string {

    let today: Date = new Date();

    //YYYYMMDD
    let ret: string = 
      today.getFullYear().toString()
     + today.getMonth().toString().padStart(2, '0')
     + today.getDay().toString().padStart(2, '0');

    if (referenceId.length > 4) {
      ret += referenceId.substring(referenceId.length - 5);
    } else {
      ret += "0".repeat(4 - referenceId.length) + referenceId;
    }

    return ret;
  };

  
  /**
  Populates a query with dependant data.
  */
  private populate(query: mongoose.DocumentQuery<Tracking, Tracking, {}>) {

    query.populate('donation_id').populate('steps');
  }

  
  /**
  Finds all tracked donations.
  */
  async findAll(): Promise<Tracking[]> {
    return this.trackingModel.find().exec();
  }

  /**
  Finds a tracked donation by it's ID.

  @param id Tracking ID.

  @returns a promise that will resolve to the Tracking, null if it
  does not exists.
  */
  async findById(id: string): Promise<Tracking> {

    let query = this
                .trackingModel
                .findById(id);

    this.populate(query);
    return query.exec();
  }

  /**
  Finds a tracked donation by it's donationID.

  @param donationId Donation ID.

  @returns a Promise that will resolve to a Tracking.
  */
  async findByDonationId(donationId: string): Promise<Tracking> {

    let query = this
                .trackingModel
                .findOne({'donation_id': new mongoose.Types.ObjectId(donationId)})

    this.populate(query);
    return query.exec();
  }

  /**
  Creates a Tracking model.

  @param donation Donation beign tracked.

  @returns a promise that will resolve to a Tracking model with populated fields.
  */
  async create(donation: Donation): Promise<Tracking> {

    //TrackingStep container
    let trackingSteps: TrackingStep[] = new Array<TrackingStep>();

    //Default TrackingStep model.
    let stepModel: TrackingStep = new this.trackingStepModel(new TrackingStepDto(
      DonationStates.Pending,
      1
    ));

    //Save and retrieve TrackingStep
    await stepModel.save();
    stepModel = await this.trackingStepModel.findById(stepModel.id).exec();

    //Add saved TrackingStep to container
    trackingSteps.push(stepModel);


    //Create Tracking model.
    let createdModel = new this.trackingModel(new TrackingDto(
      this.generateTrackingNumber(donation.id),
      donation,
      trackingSteps
    ));
    
    //Save and retrieve Tracking model.
    await createdModel.save();
    createdModel = await this.findById(createdModel.id);
    return createdModel;
  }
}
