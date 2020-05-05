import { Schema, Document } from 'mongoose';
import { Order } from '../../orders/interfaces/Order';
import { HealthCenter } from '../../health-centers';
import { Address } from '../../locations/interfaces/address.interface';

export interface HealthCenterSuggestion extends Document {
  readonly healthCenter: Schema.Types.ObjectId | HealthCenter;
  readonly name: string;
  readonly category: string;
  readonly address: Address;
  readonly dist: Dist;
  readonly order:  Order[];

}

export interface Dist extends Document {
calculated: number;
location: number[];
  }
