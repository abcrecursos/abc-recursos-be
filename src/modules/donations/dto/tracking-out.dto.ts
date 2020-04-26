import { Tracking, Donation } from '../interfaces';
import { TrackingStepOutDto, DonationItemOutDto, DonationOutDto } from './';

export class TrackingOutDto {

	readonly id: any;
	readonly number: String;
	readonly donation: DonationOutDto | string;
	readonly steps: TrackingStepOutDto[];

	constructor(tracking: Tracking, donation: Donation | string) {

		this.id = tracking.id;
		this.number = tracking.number;

		this.steps = tracking.steps.map(current => new TrackingStepOutDto(current));
		
		if (typeof donation === "string") {
			this.donation = donation;
		} else {
			this.donation = new DonationOutDto(donation);
		}
	}
}
