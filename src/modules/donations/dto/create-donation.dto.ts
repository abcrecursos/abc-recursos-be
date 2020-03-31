import { Supply } from "src/modules/supplies/interfaces/Supply";
import { Schema, Document } from 'mongoose';

export class CreateDonationDto {
  readonly name: string;
  readonly description: string;
  readonly priority: number;
  readonly state: String;
  readonly insumos: [{
    type:  Schema.Types.ObjectId,
    quantity: Number
  }]
}
