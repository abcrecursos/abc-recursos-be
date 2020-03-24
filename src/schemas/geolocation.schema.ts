import * as mongoose from 'mongoose';

const GeoLocationSchema = new mongoose.Schema({
  type: { default: 'Point', type: String },
  coordinates: { type: [Number], index: '2dsphere' },
});

export default GeoLocationSchema;
