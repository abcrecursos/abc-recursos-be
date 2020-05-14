import * as mongoose from 'mongoose';

const TrackingStepSchema = new mongoose.Schema(
  {
    description: { type: String, required: true },
    order: { type: Number, required: true }
  },
  {
    timestamps: true,
    _id: false
  },
);

export default TrackingStepSchema;
