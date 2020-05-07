import * as mongoose from 'mongoose';
import { DonationStates } from 'src/constants/donationStates';

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
      alias: 'order'
    },
    person_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Person',
      alias: 'person'
    },
    items: [
      {
        supply_id: { type: mongoose.Schema.Types.ObjectId, ref: 'supply' },
        quantity: { type: Number },
      },
    ],
  },
  {
    timestamps: true,
  },
);

export default DonationSchema;
