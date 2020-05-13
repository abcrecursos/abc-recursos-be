import { Donation } from '../interfaces/Donation';
import { DonationItemOutDto, TrackingOutDto } from './';

export class DonationOutDto {
	id: String;
	state: String;
	order: any;
	person: any;
	items: DonationItemOutDto[];
	tracking: TrackingOutDto;

	constructor(donation: Donation) {
		this.id = donation.id;
		this.state = donation.state;
		this.order = donation.order;
		this.person = donation.person;

		this.items = donation.items.map(current => new DonationItemOutDto(current));
		this.tracking = new TrackingOutDto(donation.tracking);
	}
}
