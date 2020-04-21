import { Schema, Document } from 'mongoose';

/**
An step made on a point in the lifetime
of a donation.
*/
export interface TrackingStep extends Document {

	/**
	Description of the step.
	*/
	readonly description: String;

	/**
	Order of the step in the whole traking.
	*/
	readonly order: Number;
}