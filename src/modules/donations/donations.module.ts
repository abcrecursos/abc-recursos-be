import { Module } from '@nestjs/common';
import { DonationsController } from './donations.controller';
import { DonationsService } from './donations.service';
import { MongooseModule } from '@nestjs/mongoose';
import DonationSchema from '../../database/schemas/donation.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Donation', schema: DonationSchema }])],
  controllers: [DonationsController],
  providers: [DonationsService],
})
export class DonationsModule {}
