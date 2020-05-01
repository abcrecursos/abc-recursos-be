import { Order } from '../../orders';
import { HealthCenter } from '../../health-centers';
import { HealthCenterSuggestion } from '../../orders/interfaces/HealthCenterSuggestion';
import { Dist } from '../../orders/interfaces/HealthCenterSuggestion';
import { Address } from '../../locations/interfaces/address.interface';
import { Schema, Document } from 'mongoose';

export class HealthCenterSuggestionDto {

	readonly healthCenter: Schema.Types.ObjectId | HealthCenter;
	readonly name: string;
	readonly category: string;
	readonly address: Address;


	readonly dist: Dist;
	readonly order: any;


//	readonly dist: {calculated: number, location:[number, number] } ;
	//readonly order:  Order[];
	constructor(healthcentersuggestion: HealthCenterSuggestion) {
		this.healthCenter = healthcentersuggestion.healthCenter;
		this.name = healthcentersuggestion.name;
		this.category = healthcentersuggestion.category;
		this.address = healthcentersuggestion.address;
		

		this.dist = healthcentersuggestion.dist;
		this.order=healthcentersuggestion.order;
		//this.order = healthcentersuggestion.order.map(current => new OrderDto(current));
		//donation.items.map(current => new DonationItemOutDto(current));
	}

}
