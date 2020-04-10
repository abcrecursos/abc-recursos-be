import { Document, Schema } from 'mongoose';

export interface SupplyItem extends Document {
  readonly name: string;
  readonly description: string;

  //readonly supply_id: Schema.Types.ObjectId;
  //readonly quantity: number;
}
