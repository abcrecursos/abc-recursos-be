import { Document, Schema } from 'mongoose';

export interface DonationItem extends Document {
  readonly supply_name: string;
  readonly supply_id: Schema.Types.ObjectId;
  readonly quantity: number;
}
