import { Schema, Document } from 'mongoose';
import { DonationItem, Tracking } from './';

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
  Referenced Order ID.
  */
  readonly order: Schema.Types.ObjectId;

  /**
  Referenced Donator ID.
  */
  readonly person: Schema.Types.ObjectId;

  /**
  Donated items.
  */
  readonly items: DonationItem[];

  /**
  Tracking information.
  */
  readonly tracking: Tracking;
}
