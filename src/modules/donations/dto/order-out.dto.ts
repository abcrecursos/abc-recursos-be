import { Order } from '../../orders';
import { HealthCenter } from '../../health-centers';


export class OrderOutDto {

	readonly priority: number;
	readonly healthCenterId: string;
	readonly location: {
		latitude: number,
		longitude: number
	};



	constructor(order: Order, healthCenter: HealthCenter | string) {

		this.priority = order.priority;

		if (typeof healthCenter === "string") {
			this.healthCenterId = healthCenter;
		} else {
			this.healthCenterId = healthCenter.id;

			this.location = {
				longitude: healthCenter.address.geoLocation.coordinates[0],
				latitude: healthCenter.address.geoLocation.coordinates[1]

			}
		}
	}

	equals(another: OrderOutDto): boolean {

		return this.healthCenterId == another.healthCenterId &&
					this.location.latitude == another.location.latitude &&
					this.location.longitude == another.location.longitude;
	}
}
