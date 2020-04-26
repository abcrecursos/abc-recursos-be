import { DonationItem } from '../interfaces/DonationItem';

export class DonationItemOutDto {

	readonly supply: any;
	readonly quantity: Number;

	constructor(item: DonationItem) {
		this.supply = item.supply_id;
		this.quantity = item.quantity;
	}
}
