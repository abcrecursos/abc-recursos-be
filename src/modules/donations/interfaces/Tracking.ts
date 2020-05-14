import { Schema, Document } from 'mongoose';
import { Donation } from './Donation';
import { TrackingStep } from './TrackingStep';

/**
Traking information of a donation.
*/
export interface Tracking extends Document {

  /**
  Tracking unique number.
  */
  readonly number: String;

  /**
  Tracking steps made throug donation lifetime.
  */
  readonly steps: Array<TrackingStep>
}
