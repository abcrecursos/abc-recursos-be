import * as mongoose from 'mongoose';
import GeoLocationSchema from './geolocation.schema';

const AddressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  number: { type: String, required: true },
  postalCode: { type: String, required: true },
  city: { type: String, required: true }, //Change this
  province: { type: String, required: true }, //Change this
  geoLocation: GeoLocationSchema,
});

export default AddressSchema;
