import { Schema, Document } from 'mongoose';
import { DonationItem } from './DonationItem';

export interface Donation extends Document {
  readonly title: string;
  readonly observations: string;
  readonly priority: number;
  readonly state: string;
  readonly healthCenter_id: Schema.Types.ObjectId;
  readonly items: DonationItem[];
}
