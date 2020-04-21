import { Document, Schema } from 'mongoose';

/**
An item that has been donated.
*/
export interface DonationItem extends Document {

  /**
  Supply identification.
  */
  readonly supply_id: Schema.Types.ObjectId;

  /**
  Donated quantity.
  */
  readonly quantity: number;
}
