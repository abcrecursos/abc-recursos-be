import { Schema, Document } from 'mongoose';

export interface Donation extends Document {
  readonly name: string;
  readonly description: string;
  readonly priority: number;
  readonly state: String;
  readonly items: [
    {
      supply_name: string;
      supply_id: Schema.Types.ObjectId;
      quantity: Number;
    },
  ];
}
