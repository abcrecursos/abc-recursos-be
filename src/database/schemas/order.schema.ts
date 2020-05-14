import * as mongoose from 'mongoose';
import { OrderStates } from '../../constants/orderStates';
import AddressSchema from './address.schema';
import PhoneSchema from './phone.schemas';
import PersonSchema from './person.schema';
import TrackingSchema from './tracking.schema';

const OrderSchema = new mongoose.Schema(
  {
    person_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Person',
      required: true,
      alias: 'person'
    },

    observations: { type: String },
    priority: { type: Number, default: 5 },
    state: { type: String, enum: Object.keys(OrderStates) },
    healthCenter_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'HealthCenter',
      alias: 'healthCenter'
    },

    items: [
      {
        supply_id: { type: mongoose.Schema.Types.ObjectId, ref: 'supply', alias: 'supply' },
        quantity: { type: Number },
      },
    ],

    address: AddressSchema,
    phone: PhoneSchema,
    tracking: TrackingSchema
  },
  {
    timestamps: true,
  },
  );

export default OrderSchema;
