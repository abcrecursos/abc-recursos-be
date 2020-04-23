import * as mongoose from 'mongoose';
import AddressSchema from './address.schema';
import PhoneSchema from './phone.schemas';

const PersonSchema = new mongoose.Schema({
  name: { type: String , required: true },
  lastname: { type: String , required: true },
  email: { type: String , required: true },

  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  address: AddressSchema,
  phone: PhoneSchema

});

export default PersonSchema;
