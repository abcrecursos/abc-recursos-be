import { Schema, Document } from 'mongoose';
import { OrderItem } from './OrderItem';
import { HealthCenter } from '../../health-centers';

export interface Order extends Document {
  readonly person_id: Schema.Types.ObjectId;

  readonly observations: string;
  readonly priority: number;
  readonly state: string;
  readonly healthCenter: Schema.Types.ObjectId | HealthCenter;
  readonly items: OrderItem[];
}
