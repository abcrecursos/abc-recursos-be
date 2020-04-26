import * as mongoose from 'mongoose';

const TrackingSchema = new mongoose.Schema(
  {
    number: String,
    donation_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Donation',
      alias: 'donation'
    },
    steps: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "TrackingStep"
    }]
  },
  {
    timestamps: true,
  },
);

export default TrackingSchema;
