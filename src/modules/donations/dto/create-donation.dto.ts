import { Schema, Document } from 'mongoose';

export class CreateDonationDto {
  readonly title: string;
  readonly observations: string;
  readonly priority: number;
  readonly state: String;
  readonly healthCenter: Schema.Types.ObjectId;
  readonly items: [
    {
      supply_name: string;
      supply_id: Schema.Types.ObjectId;
      quantity: Number;
    },
  ];
}
