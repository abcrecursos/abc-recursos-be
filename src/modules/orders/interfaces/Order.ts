import { Schema, Document } from 'mongoose';
import { OrderItem } from './OrderItem';
//import { Person } from "../../people/interfaces/person";

export interface Order extends Document {
  readonly person_id: Schema.Types.ObjectId;

  readonly observations: string;
  readonly priority: number;
  readonly state: string;
  readonly healthCenter_id: Schema.Types.ObjectId;
  readonly items: OrderItem[];
}
