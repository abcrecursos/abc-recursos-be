import * as mongoose from 'mongoose';
import GeoLocationSchema from './geolocation.schema';

const AddressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  number: { type: String, required: true },
  postalCode: { type: String, required: true },
  city: { type: String, required: true }, //Change this
  state: { type: String, required: true }, //Change this
  location: GeoLocationSchema,
});

export default AddressSchema;
