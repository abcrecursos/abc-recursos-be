import * as mongoose from 'mongoose';
import TrackingStep from './trackingStep.schema';

const TrackingSchema = new mongoose.Schema(
  {
    number: String,
    steps: [TrackingStep]
  },
  {
    timestamps: true,
    _id: false
  },
);

export default TrackingSchema;
