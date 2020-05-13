import { Tracking } from '../interfaces';
import { TrackingStepOutDto } from './';

export class TrackingOutDto {

	readonly number: String;
	readonly steps: TrackingStepOutDto[];

	constructor(tracking: Tracking) {

		this.number = tracking.number;
		this.steps = tracking.steps.map(current => new TrackingStepOutDto(current));
	}
}
