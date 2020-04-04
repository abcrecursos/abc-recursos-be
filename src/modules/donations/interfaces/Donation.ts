import { Schema, Document } from 'mongoose';
import { Supply } from 'src/modules/supplies/interfaces/Supply';

export interface Donation extends Document {
  readonly name: string;
  readonly description: string;
  readonly priority: number;
  readonly state: String,
  readonly insumos: [{
    supplt_name: string
    supply_id: Schema.Types.ObjectId,
    quantity:Number,
  }]
}
