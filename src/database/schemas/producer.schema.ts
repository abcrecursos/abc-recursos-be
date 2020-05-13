import * as mongoose from 'mongoose';
import AddressSchema from './address.schema';
import PhoneSchema from './phone.schemas';
import { ProducerTypes } from '../../constants/producerTypes';
import ProducerSupplySchema from './producerSupply.schema';
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
supply:[ProducerSupplySchema],
//  type: { type: mongoose.Schema.Types.ObjectId, ref: 'supply' },
//  quantity:{type:Number}
person_id: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Person',
},
user_id: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
},
}
,
{
  timestamps: true
}

);

export default ProducerSchema;
