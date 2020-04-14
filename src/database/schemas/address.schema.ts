import * as mongoose from 'mongoose';
import GeoLocationSchema from './geolocation.schema';

const AddressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  number: { type: String, required: true },
  postalCode: { type: String, required: true },
  city: { type: String, required: true }, //Change this
  departmento: { type: String, required: false },
  province: { type: String, required: true }, //Change this

  locality_id:{ type: String, required: false },
  province_id:{ type: String, required: false },
  departamento_id:{ type: String, required: false },

  geoLocation: GeoLocationSchema,
});

export default AddressSchema;
