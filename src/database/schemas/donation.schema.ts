import * as mongoose from 'mongoose';
import { DonationStates } from 'src/constants/donationStates';

const DonationSchema = new mongoose.Schema({
    description: String,
    priority: { type: Number, default: 5 },
    state: { type: String, enum: Object.keys(DonationStates) },
    insumos: [{
      type: { type: mongoose.Schema.Types.ObjectId, ref: 'supply' },
      quantity:{type:Number}
    }]
  },
  {
    timestamps: true
  } 
);

export default DonationSchema;