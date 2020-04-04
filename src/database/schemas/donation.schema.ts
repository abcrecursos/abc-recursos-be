import * as mongoose from 'mongoose';
import { DonationStates } from 'src/constants/donationStates';

const DonationSchema = new mongoose.Schema(
  {
    title: { type: String },
    observations: { type: String },
    priority: { type: Number, default: 5 },
    state: { type: String, enum: Object.keys(DonationStates) },
    healthCenter: { type: mongoose.Schema.Types.ObjectId, ref: 'HealthCenter' },
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
