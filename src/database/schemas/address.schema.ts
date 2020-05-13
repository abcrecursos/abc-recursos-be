import * as mongoose from 'mongoose';
import GeoLocationSchema from './geolocation.schema';

const AddressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  number: { type: String, required: true },
  postalCode: { type: String, required: true },
  location: { type: String, required: true },
  departmento: { type: String, required: false },
  province: { type: String, required: true },
  departamento_id:{ type: String, required: false },

  geoLocation: GeoLocationSchema,
});

export default AddressSchema;
