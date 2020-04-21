import { GetHealthCenterDto } from '../../health-centers';
import { Supply } from '../../supplies';
import { Tracking, Donation, DonationItem } from '../interfaces';

type StepOut = {
	description: String,
	order: Number
};

type TrackingInformationOut = {
	number: String,
	steps: StepOut[]
};

type DonationItemOut = {

};

export class CreateDonationOutDto {
	
	readonly tracking: TrackingInformationOut;
	readonly state: String;
	readonly id: any;
	readonly healthCenterId: any;
	readonly items: DonationItem[];


	constructor(
		trackingInformation: Tracking,
		donation: Donation
	) {
		let steps: StepOut[] = new Array<StepOut>();

		for (var i = trackingInformation.steps.length - 1; i >= 0; i--) {

			let current = trackingInformation.steps[i]

			steps.push({
				description: current.description,
				order: current.order
			});
		}

		this.tracking = {
			number: trackingInformation.number,
			steps: steps
		};

		this.state = donation.state;
		this.id = donation.id;
		this.healthCenterId = donation.healthCenter;
		this.items = donation.items;
	}
}