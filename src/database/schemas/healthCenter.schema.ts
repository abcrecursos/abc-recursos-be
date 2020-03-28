import * as mongoose from 'mongoose';
import GeoLocationSchema from './geolocation.schema';
import AddressSchema from './address.schema';

// TODO: move this
export const healthCentersCategories = 'Puesto de Salud,Centro de Salud,Hospital'.split(
  ',',
);

const HealthCenterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  address: AddressSchema,
  location: GeoLocationSchema,
  category: { type: String, enum: healthCentersCategories },
});

export default HealthCenterSchema;
