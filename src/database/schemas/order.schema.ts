import * as mongoose from 'mongoose';
import { DonationStates } from 'src/constants/donationStates';
import AddressSchema from './address.schema';
import PhoneSchema from './phone.schemas';
import PersonSchema from './person.schema';
const OrderSchema = new mongoose.Schema(
  {
// cambiar a requerido
    person_id: { type: String , required: false },
    person: PersonSchema,

    observations: { type: String },
    priority: { type: Number, default: 5 },
    state: { type: String, enum: Object.keys(DonationStates) },
    healthCenter_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'HealthCenter',
      alias: 'healthCenter'
    },

    items: [
      {
        supply_name: { type: String },
        supply_id: { type: mongoose.Schema.Types.ObjectId, ref: 'supply' },
        quantity: { type: Number },
      },
    ],

    address: AddressSchema,
    phone: PhoneSchema,
  },
  {
    timestamps: true,
  },
  );

export default OrderSchema;
