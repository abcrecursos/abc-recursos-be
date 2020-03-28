import * as mongoose from 'mongoose';
import { PhoneTypes } from 'src/constants/phoneTypes';

const PhoneSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: Object.keys(PhoneTypes),
    default: PhoneTypes.Phone,
  },
  prefix: String,
  number: String,
});

export default PhoneSchema;
