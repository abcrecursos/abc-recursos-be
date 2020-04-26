import { Supply } from '../interfaces'

export class SupplyOutDto {
	readonly id: any;
	readonly name: string;
  readonly description: string;
  readonly priority: number;

  constructor(supply: Supply) {
  	this.id = supply.id;
  	this.name = supply.name;
  	this.description = supply.description;
  	this.priority = supply.priority
  }
}
