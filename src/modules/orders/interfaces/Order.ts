import { Schema, Document } from 'mongoose';
import { OrderItem, Tracking } from './';
import { HealthCenter } from '../../health-centers';
import { Person } from '../../people';

export interface Order extends Document {
  readonly person: Schema.Types.ObjectId | Person;

  readonly observations: string;
  readonly priority: number;
  readonly state: string;
  readonly healthCenter: Schema.Types.ObjectId | HealthCenter;
  readonly items: OrderItem[];
  readonly tracking: Tracking;
}
