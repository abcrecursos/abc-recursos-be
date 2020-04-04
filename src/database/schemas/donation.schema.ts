import * as mongoose from 'mongoose';
import { DonationStates } from 'src/constants/donationStates';

const DonationSchema = new mongoose.Schema(
  {
    description: { type: String },
    priority: { type: Number, default: 5 },
    state: { type: String, enum: Object.keys(DonationStates) },
    items: [
      {
        supply_name: { type: String },
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
