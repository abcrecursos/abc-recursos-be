import * as mongoose from 'mongoose';
import { DonationStates } from 'src/constants/donationStates';
import AddressSchema from './address.schema';
import PhoneSchema from './phone.schemas';

const OrderSchema = new mongoose.Schema(
  {
    person_name: { type: String , required: true },
    person_lastname: { type: String , required: true },
    email: { type: String , required: true },

    observations: { type: String },
    priority: { type: Number, default: 5 },
    state: { type: String, enum: Object.keys(DonationStates) },
    healthCenter_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'HealthCenter',
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
