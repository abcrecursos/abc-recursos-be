import * as mongoose from 'mongoose';
import AddressSchema from './address.schema';
import PhoneSchema from './phone.schemas';
import { ProducerTypes } from '../../constants/producerTypes';
import SupplySchema from './supply.schema';
const ProducerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cuit: String,
  description: String,
  category: {
    type: String,
    enum: Object.keys(ProducerTypes),
    default: ProducerTypes.PyME,
  },
  address: AddressSchema,
  email: String,
  phone: PhoneSchema,
  //insumos: [{
  //  type: { type: mongoose.Schema.Types.ObjectId, ref: 'supply' },
  //  quantity:{type:Number}
//  }],
insumos:[SupplySchema],
//  type: { type: mongoose.Schema.Types.ObjectId, ref: 'supply' },
//  quantity:{type:Number}
}
,
{
  timestamps: true
}

);

export default ProducerSchema;
