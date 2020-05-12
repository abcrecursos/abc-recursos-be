import * as mongoose from 'mongoose';
import { DonationStates } from 'src/constants/donationStates';
import TrackingSchema from './tracking.schema';

const DonationSchema = new mongoose.Schema(
  {
    state: {
      type: String,
      enum: Object.keys(DonationStates),
      default: 'Pending'
    },
    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
    },
    items: [
      {
        supply_id: { type: mongoose.Schema.Types.ObjectId, ref: 'supply' },
        quantity: { type: Number },
      },
    ],
    tracking: TrackingSchema
  },
  {
    timestamps: true,
  },
);

export default DonationSchema;
