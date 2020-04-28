import { Order } from '../../orders';
import { HealthCenter } from '../../health-centers';
//import { Order } from '../../orders/interfaces/Order';
import { Address } from '../../locations/interfaces/address.interface';
import { Schema, Document } from 'mongoose';

export class HealthCenterSuggestionDto {

	readonly healthCenter: Schema.Types.ObjectId | HealthCenter;
	readonly name: string;
	readonly category: string;
	readonly address: Address;
//	readonly dist: {calculated: number, location:[number, number] } ;
	//readonly order:  Order[];

}
