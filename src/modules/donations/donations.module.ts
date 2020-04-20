import { Module } from '@nestjs/common';
import { DonationsController } from './donations.controller';
import { DonationsService } from './donations.service';
import { TrackingService } from './tracking.service';
import { MongooseModule } from '@nestjs/mongoose';
import DonationSchema from '../../database/schemas/donation.schema';
import TrackingSchema from '../../database/schemas/tracking.schema';
import TrackingStepSchema from '../../database/schemas/trackingStep.schema';
import { SuppliesModule } from '../supplies/supplies.module';
import { HealthCentersModule } from '../health-centers/health-centers.module';

@Module({
  imports: [
  	MongooseModule.forFeature([{ name: 'Donation', schema: DonationSchema }]),
  	MongooseModule.forFeature([{ name: 'Tracking', schema: TrackingSchema }]),
  	MongooseModule.forFeature([{ name: 'TrackingStep', schema: TrackingStepSchema }]),
  	SuppliesModule,
  	HealthCentersModule
  ],
  controllers: [DonationsController],
  providers: [DonationsService, TrackingService],
})
export class DonationsModule {}
