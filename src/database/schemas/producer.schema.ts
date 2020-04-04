import * as mongoose from 'mongoose';
import AddressSchema from './address.schema';
import { HealthCenterTypes } from '../../constants/healthCentersTypes';
import PhoneSchema from './phone.schemas';

const HealthCenterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  address: AddressSchema,
  category: {
    type: String,
    enum: Object.keys(HealthCenterTypes),
    default: HealthCenterTypes.Hospital,
  },
  phone: PhoneSchema
});

export default HealthCenterSchema;
