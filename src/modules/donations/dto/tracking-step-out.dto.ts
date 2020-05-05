import { TrackingStep } from '../interfaces/TrackingStep';

export class TrackingStepOutDto {
	readonly description: String;
	readonly order: Number;

	constructor(step: TrackingStep) {
		this.description = step.description;
		this.order = step.order;
	}
}
