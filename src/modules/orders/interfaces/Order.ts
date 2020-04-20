import { Schema, Document } from 'mongoose';
import { OrderItem } from './OrderItem';
import { Phone } from '../../phones/interfaces/phone.interface';
import { Address } from '../../locations/interfaces/address.interface';

export interface Order extends Document {
  readonly person_name: string;
  readonly person_lastname: string;
  readonly email: string;

  readonly address: Address;
  readonly phone: Phone;


  readonly observations: string;
  readonly priority: number;
  readonly state: string;
  readonly healthCenter_id: Schema.Types.ObjectId;
  readonly items: OrderItem[];
}
