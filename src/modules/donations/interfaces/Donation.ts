import { Schema, Document } from 'mongoose';
import { DonationItem } from './DonationItem';

/**
Represents a donation of a person to an
organization.
*/
export interface Donation extends Document {
	
  /**
  Current state of a donation.
  */
  readonly state: string;

  /**
  Benefited health center ID.
  */
  readonly healthCenter: Schema.Types.ObjectId;

  /**
  Donated items.
  */
  readonly items: DonationItem[];
}
